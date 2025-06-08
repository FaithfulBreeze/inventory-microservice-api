import { Module } from '@nestjs/common';
import { StorageService } from './storage.service';
import { StorageController } from './storage.controller';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { KAFKA_CLIENTS } from '../utils/constants/tokens';

@Module({
  imports: [
    ClientsModule.register([
      {
        transport: Transport.KAFKA,
        name: KAFKA_CLIENTS.STORAGE_SERVICE,
        options: {
          client: {
            brokers: ['localhost:9092'],
          },
          consumer: {
            groupId: 'storage-consumer',
          },
        },
      },
    ]),
  ],
  controllers: [StorageController],
  providers: [StorageService],
  exports: [ClientsModule, StorageService],
})
export class StorageModule {}
