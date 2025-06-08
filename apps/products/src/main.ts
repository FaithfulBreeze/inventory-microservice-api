import { NestFactory } from '@nestjs/core';
import { ProductsModule } from './products.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    ProductsModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'products',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'products-consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
