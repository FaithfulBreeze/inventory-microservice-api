import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateStorageEntryDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  productId: number;
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  quantity: number;
}
