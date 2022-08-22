import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BrokerModule } from './broker/broker.module';
import { ChatMessageModule } from './chat-message/chat-message.module';
import { ClientController } from './client/client.controller';

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    BrokerModule,
    ChatMessageModule,
    ClientsModule.register([
      {
        name: 'CHAT_MESSAGE',
        transport: Transport.GRPC,
        options: {
          package: 'ChatMessage',
          protoPath: join(__dirname, 'chat-message/chat-message.proto')
        }
      }
    ])
  ],
  controllers: [AppController, ClientController],
  providers: [AppService]
})
export class AppModule {}
