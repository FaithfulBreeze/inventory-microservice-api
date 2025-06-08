import { NestFactory } from '@nestjs/core';
import { StorageModule } from './storage.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.createMicroservice<MicroserviceOptions>(
    StorageModule,
    {
      transport: Transport.KAFKA,
      options: {
        client: {
          clientId: 'storage',
          brokers: ['localhost:9092'],
        },
        consumer: {
          groupId: 'storage-consumer',
        },
      },
    },
  );
  await app.listen();
}
bootstrap();
