import {
  Body,
  Controller,
  Inject,
  OnModuleInit,
  Post,
  Res
} from '@nestjs/common';
import { ClientGrpc } from '@nestjs/microservices';
import { Response } from 'express';
import { firstValueFrom, Observable } from 'rxjs';
import { ChatMessage } from '../chat-message/chat-message.interface';

interface AllMessagesService {
  all(): Observable<ChatMessage>;
}

interface SendMessageService {
  send(chatMessage: ChatMessage): Observable<void>;
}

@Controller('client')
export class ClientController implements OnModuleInit {
  private allMessagesService: AllMessagesService;
  private sendMessageService: SendMessageService;

  constructor(@Inject('CHAT_MESSAGE') private readonly client: ClientGrpc) {}

  onModuleInit(): void {
    this.allMessagesService =
      this.client.getService<AllMessagesService>('AllMessagesService');
    this.sendMessageService =
      this.client.getService<SendMessageService>('SendMessageService');

    this.allMessagesService.all().subscribe((chatMessage: ChatMessage) => {
      console.log(chatMessage);
    });
  }

  @Post('')
  async sendMessage(
    @Body() chatMessage: ChatMessage,
    @Res() res: Response
  ): Promise<void> {
    await firstValueFrom(this.sendMessageService.send(chatMessage));
    res.json({ status: true, message: 'Acknowledged' });
  }
}
