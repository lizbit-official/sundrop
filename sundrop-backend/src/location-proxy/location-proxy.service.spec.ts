import { Test, TestingModule } from '@nestjs/testing';
import { LocationProxyService } from './location-proxy.service';

describe('LocationProxyService', () => {
  let service: LocationProxyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LocationProxyService],
    }).compile();

    service = module.get<LocationProxyService>(LocationProxyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
