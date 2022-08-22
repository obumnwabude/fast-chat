import { Module } from '@nestjs/common';
import { BrokerModule } from 'src/broker/broker.module';
import { ChatMessageController } from './chat-message.controller';

@Module({
  imports: [BrokerModule],
  controllers: [ChatMessageController]
})
export class ChatMessageModule {}