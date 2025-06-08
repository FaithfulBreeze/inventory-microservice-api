import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';
import { Repository } from 'typeorm';
import { UpdateStorageEntryDto } from './dto/update-storage-entry.dto';
import { CreateStorageEntryDto } from './dto/create-storage-entry.dto';

@Injectable()
export class StorageService {
  constructor(
    @InjectRepository(Storage) private readonly repo: Repository<Storage>,
  ) {}
  create(createDto: CreateStorageEntryDto) {
    this.repo.save(this.repo.create(createDto));
  }
  findAll() {
    return this.repo.find();
  }
  async findOne(id: number) {
    const data = await this.repo.findOne({
      where: {
        id,
      },
    });
    if (!data) return null;
    return { ...data };
  }

  update(id: number, updateDto: UpdateStorageEntryDto) {
    this.repo.update(id, updateDto);
  }

  remove(id: number) {
    this.repo.delete({ id });
  }
}
