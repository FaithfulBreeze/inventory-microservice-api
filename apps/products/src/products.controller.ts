import { Controller } from '@nestjs/common';
import { ProductsService } from './products.service';
import { EventPattern, Payload, MessagePattern } from '@nestjs/microservices';
import { CreateProductDto } from 'apps/api-gateway/src/products/dto/create-product.dto';
import { UpdateProductDto } from 'apps/api-gateway/src/products/dto/update-product.dto';

@Controller()
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @EventPattern('products.create')
  create(
    @Payload()
    { data }: { data: { createProductDto: CreateProductDto } },
  ) {
    this.productsService.create(data.createProductDto);
  }

  @MessagePattern('products.findAll')
  findAll() {
    return this.productsService.findAll();
  }

  @MessagePattern('products.findOne')
  async findOne(@Payload() { data: { id } }: { data: { id: number } }) {
    return await this.productsService.findOne(id);
  }

  @EventPattern('products.update')
  update(
    @Payload()
    { data }: { data: { id: number; updateProductDto: UpdateProductDto } },
  ) {
    if (Object.keys(data.updateProductDto).length)
      this.productsService.update(data.id, data.updateProductDto);
  }

  @EventPattern('products.remove')
  remove(@Payload() { data: { id } }: { data: { id: number } }) {
    this.productsService.remove(id);
  }
}
