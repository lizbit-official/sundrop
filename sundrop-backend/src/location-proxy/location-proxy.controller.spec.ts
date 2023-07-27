import { Test, TestingModule } from '@nestjs/testing';
import { LocationProxyController } from './location-proxy.controller';

describe('LocationProxyController', () => {
  let controller: LocationProxyController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LocationProxyController],
    }).compile();

    controller = module.get<LocationProxyController>(LocationProxyController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
