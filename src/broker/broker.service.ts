import { Injectable, OnModuleInit } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MemphisService } from 'memphis-dev/nest';

@Injectable()
export class BrokerService implements OnModuleInit {
  consumer;
  producer;

  constructor(
    private configService: ConfigService,
    private memphisService: MemphisService,
  ) { }

  async onModuleInit(): Promise<void> {
    try {
      await this.memphisService.connect({
        host: this.configService.get<string>('MEMPHIS_HOST'),
        username: this.configService.get<string>('MEMPHIS_USERNAME'),
        connectionToken: this.configService.get<string>('MEMPHIS_TOKEN'),
      });
      this.consumer = await this.memphisService.consumer({
        stationName: 'chat',
        consumerName: 'chatConsumer',
        consumerGroup: 'chatConsumers',
      });
      this.producer = await this.memphisService.producer({
        stationName: 'chat',
        producerName: 'chatProducer',
      });
    } catch (error) {
      console.error(error);
      this.memphisService.close();
    }
  }
}