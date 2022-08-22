import { Controller } from '@nestjs/common';
import { GrpcMethod } from '@nestjs/microservices';
import { Observable, ReplaySubject } from 'rxjs';
import { BrokerService } from 'src/broker/broker.service';
import { ChatMessage } from './chat-message.interface';

@Controller('chat-message')
export class ChatMessageController {
  private readonly chatMessages$ = new ReplaySubject<ChatMessage>();

  constructor(private brokerService: BrokerService) {}

  onModuleInit(): void {
    this.brokerService.consumer.on('message', (message) => {
      this.chatMessages$.next(
        JSON.parse(message.getData().toString()) as ChatMessage
      );
      message.ack();
    });
  }

  @GrpcMethod('AllMessagesService', 'all')
  all(): Observable<ChatMessage> {
    return this.chatMessages$.asObservable();
  }

  @GrpcMethod('SendMessageService', 'send')
  async send(chatMessage: ChatMessage): Promise<void> {
    await this.brokerService.producer.produce({
      message: Buffer.from(JSON.stringify(chatMessage))
    });
  }
}
