import { Module } from '@nestjs/common';
import { MemphisModule } from 'memphis-dev/nest';
import { BrokerService } from './broker.service';

@Module({
  imports: [MemphisModule.register()],
  exports: [BrokerService],
  providers: [BrokerService]
})
export class BrokerModule {}
