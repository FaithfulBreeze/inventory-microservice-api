import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENTS } from './utils/constants/tokens';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { connectKafkaClients } from './utils/connect-kafka-clients.util';
import { initializeSwagger } from './utils/initialize-swagger.util';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(new ValidationPipe());
  initializeSwagger(app);
  await app.init();
  await connectKafkaClients(app);
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
