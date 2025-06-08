import { INestApplication } from '@nestjs/common';
import { ClientKafka } from '@nestjs/microservices';
import { KAFKA_CLIENTS } from './constants/tokens';

export const connectKafkaClients = async (app: INestApplication) => {
  for (let clientKey in KAFKA_CLIENTS) {
    const kafkaClient = app.get<ClientKafka>(KAFKA_CLIENTS[clientKey]);
    await kafkaClient.connect();
  }
};
