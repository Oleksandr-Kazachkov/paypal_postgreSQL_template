import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/postgres/postgres.module';
import UserController from './user.controller';
import { userProviders } from './providers/user.provider';
import { UserService } from './user.service';
import { favouritesProviders } from '../favourites/provider/favourites.provider';
import { UserRepository } from './user.repository';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService,
    ...favouritesProviders,
    UserRepository,
  ],
  controllers: [UserController],
})
export class UserModule {}
