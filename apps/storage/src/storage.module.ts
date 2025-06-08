import { Module } from '@nestjs/common';
import { StorageController } from './storage.controller';
import { StorageService } from './storage.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Storage } from './entities/storage.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      url: 'postgres://storage-database:storage-database@localhost:5432',
      autoLoadEntities: true,
      entities: [Storage],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Storage]),
  ],
  controllers: [StorageController],
  providers: [StorageService],
})
export class StorageModule {}
