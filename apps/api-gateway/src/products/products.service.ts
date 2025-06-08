import {
  Inject,
  Injectable,
  NotFoundException,
  OnModuleInit,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientKafkaProxy } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';
import { KAFKA_CLIENTS } from '../utils/constants/tokens';

@Injectable()
export class ProductsService implements OnModuleInit {
  private readonly productsTopics = ['products.findAll', 'products.findOne'];
  constructor(
    @Inject(KAFKA_CLIENTS.PRODUCTS_SERVICE)
    private readonly client: ClientKafkaProxy,
  ) {}

  async onModuleInit() {
    const client = this.client as ClientKafkaProxy;
    this.productsTopics.forEach((topic) => client.subscribeToResponseOf(topic));
  }

  create(createProductDto: CreateProductDto) {
    this.client.emit('products.create', { data: { createProductDto } });
    return { message: 'Product added successfully' };
  }

  findAll() {
    return this.client.send('products.findAll', {});
  }

  async findOne(id: number) {
    const data = await firstValueFrom(
      this.client.send('products.findOne', { data: { id } }),
    );
    if (!data) throw new NotFoundException();
    return data;
  }

  update(id: number, updateProductDto: UpdateProductDto) {
    this.client.emit('products.update', {
      data: { id, updateProductDto },
    });
    return { message: 'Product updated successfully' };
  }

  remove(id: number) {
    this.client.emit('products.remove', { data: { id } });
    return { message: 'Product removed successfully' };
  }
}
