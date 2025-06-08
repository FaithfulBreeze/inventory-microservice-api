import { Controller } from '@nestjs/common';
import { StorageService } from './storage.service';
import { EventPattern, MessagePattern, Payload } from '@nestjs/microservices';
import { UpdateStorageEntryDto } from './dto/update-storage-entry.dto';
import { CreateStorageEntryDto } from 'apps/api-gateway/src/storage/dto/create-storage-entry.dto';

@Controller()
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @EventPattern('storage.create')
  create(
    @Payload()
    { data }: { data: { createStorageEntryDto: CreateStorageEntryDto } },
  ) {
    this.storageService.create(data.createStorageEntryDto);
  }

  @MessagePattern('storage.findAll')
  findAll() {
    return this.storageService.findAll();
  }

  @MessagePattern('storage.findOne')
  async findOne(@Payload() { data: { id } }: { data: { id: number } }) {
    return await this.storageService.findOne(id);
  }

  @EventPattern('storage.update')
  update(
    @Payload()
    {
      data,
    }: {
      data: { id: number; updateStorageEntryDto: UpdateStorageEntryDto };
    },
  ) {
    if (Object.keys(data.updateStorageEntryDto).length)
      this.storageService.update(data.id, data.updateStorageEntryDto);
  }

  @EventPattern('storage.remove')
  remove(@Payload() { data: { id } }: { data: { id: number } }) {
    this.storageService.remove(id);
  }
}
