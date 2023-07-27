import { Module } from '@nestjs/common';
import { LocationProxyController } from './location-proxy.controller';
import { LocationProxyService } from './location-proxy.service';

@Module({
  controllers: [LocationProxyController],
  providers: [LocationProxyService],
})
export class LocationProxyModule {}
