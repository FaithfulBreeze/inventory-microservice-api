import { PartialType } from '@nestjs/mapped-types';
import { CreateStorageEntryDto } from './create-storage-entry.dto';

export class UpdateStorageEntryDto extends PartialType(CreateStorageEntryDto) {}
