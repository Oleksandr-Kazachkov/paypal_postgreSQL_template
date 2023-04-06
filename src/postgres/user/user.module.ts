import { Module } from '@nestjs/common';
import { DatabaseModule } from '../postgres.module';
import UserController from './user.controller';
import { userProviders } from './providers/user.provider';
import { UserService } from './user.service';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService],
  controllers: [UserController],
})
export class UserModule {}
