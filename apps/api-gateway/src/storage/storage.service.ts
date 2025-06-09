import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { CreateStorageEntryDto } from './dto/create-storage-entry.dto';
import { UpdateStorageEntryDto } from './dto/update-storage-entry.dto';
import { firstValueFrom } from 'rxjs';
import { KAFKA_CLIENTS } from '../utils/constants/tokens';

@Injectable()
export class StorageService {
  private readonly storageTopics = ['storage.findAll', 'storage.findOne'];

  constructor(
    @Inject(KAFKA_CLIENTS.STORAGE_SERVICE)
    private readonly client: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const client = this.client as ClientKafkaProxy;
    this.storageTopics.forEach((topic) => client.subscribeToResponseOf(topic));
  }

  create(createStorageEntryDto: CreateStorageEntryDto) {
    this.client.emit('storage.create', {
      data: { createStorageEntryDto },
    });
    return {
      message: 'We are processing your request to add a new storage entry!',
    };
  }

  findAll() {
    return this.client.send('storage.findAll', {});
  }

  async findOne(id: number) {
    const data = await firstValueFrom(
      this.client.send('storage.findOne', { data: { id } }),
    );
    if (!data) throw new NotFoundException();
    return data;
  }

  update(id: number, updateStorageEntryDto: UpdateStorageEntryDto) {
    this.client.emit('storage.update', {
      data: { id, updateStorageEntryDto },
    });
    return {
      message: `We are processing your request to update storage entry #${id}!`,
    };
  }

  remove(id: number) {
    this.client.emit('storage.remove', { data: { id } });
    return {
      message: `We are processing your request to remove storage entry #${id}.`,
    };
  }
}
