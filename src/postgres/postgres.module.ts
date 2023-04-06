import { Module } from '@nestjs/common';
import { databaseProviders } from './postgres.provider';

@Module({
  providers: [...databaseProviders],
  exports: [...databaseProviders],
})
export class DatabaseModule {}
