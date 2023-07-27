import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { WeatherProxyModule } from './weather-proxy/weather-proxy.module';
import { LocationProxyModule } from './location-proxy/location-proxy.module';

@Module({
  imports: [WeatherProxyModule, LocationProxyModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
