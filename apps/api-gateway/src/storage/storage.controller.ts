import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { StorageService } from './storage.service';
import { CreateStorageEntryDto } from './dto/create-storage-entry.dto';
import { UpdateStorageEntryDto } from './dto/update-storage-entry.dto';

@Controller('storage')
export class StorageController {
  constructor(private readonly storageService: StorageService) {}

  @Post()
  @HttpCode(202)
  create(@Body() createStorageEntryDto: CreateStorageEntryDto) {
    return this.storageService.create(createStorageEntryDto);
  }

  @Get()
  findAll() {
    return this.storageService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.storageService.findOne(+id);
  }

  @Patch(':id')
  @HttpCode(202)
  update(
    @Param('id') id: string,
    @Body() updateStorageEntryDto: UpdateStorageEntryDto,
  ) {
    return this.storageService.update(+id, updateStorageEntryDto);
  }

  @Delete(':id')
  @HttpCode(202)
  remove(@Param('id') id: string) {
    return this.storageService.remove(+id);
  }
}
