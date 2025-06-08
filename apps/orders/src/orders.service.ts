import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { Order } from './entities/order.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private readonly repo: Repository<Order>,
  ) {}
  create(createDto: CreateOrderDto) {
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

  update(id: number, updateDto: UpdateOrderDto) {
    this.repo.update(id, updateDto);
  }

  remove(id: number) {
    this.repo.delete({ id });
  }
}
