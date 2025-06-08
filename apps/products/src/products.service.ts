import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { Repository } from 'typeorm';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product) private readonly repo: Repository<Product>,
  ) {}
  create(createDto: CreateProductDto) {
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

  update(id: number, updateDto: UpdateProductDto) {
    this.repo.update(id, updateDto);
  }

  remove(id: number) {
    this.repo.delete({ id });
  }
}
