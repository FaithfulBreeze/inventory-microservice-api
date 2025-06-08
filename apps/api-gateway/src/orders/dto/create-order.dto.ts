import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty()
  @IsInt()
  @ApiProperty()
  productId: number;

  @IsNotEmpty()
  @IsString()
  @ApiProperty()
  address: string;
}
