import { Module } from '@nestjs/common';
import { DatabaseModule } from '../postgres.module';
import UserController from './user.controller';
import { userProviders } from './providers/user.provider';
import { UserService } from './user.service';
import { favouritesProviders } from './providers/favourites.provider';

@Module({
  imports: [DatabaseModule],
  providers: [...userProviders, UserService, ...favouritesProviders],
  controllers: [UserController],
})
export class UserModule {}
