import { Module } from '@nestjs/common';
import { SettingsRepository } from './settings.repository';

@Module({
  imports: [],
  providers: [SettingsRepository],
  controllers: [],
})
export class OrderModule {}
