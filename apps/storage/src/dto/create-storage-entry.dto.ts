import { IsInt, IsNotEmpty } from 'class-validator';

export class CreateStorageEntryDto {
  @IsNotEmpty()
  @IsInt()
  productId: number;
  @IsNotEmpty()
  @IsInt()
  quantity: number;
}
