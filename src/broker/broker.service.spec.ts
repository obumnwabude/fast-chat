import { Test, TestingModule } from '@nestjs/testing';
import { BrokerService } from './broker.service';

describe('BrokerService', () => {
  let service: BrokerService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BrokerService],
    }).compile();

    service = module.get<BrokerService>(BrokerService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
