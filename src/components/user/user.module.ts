import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/postgres/postgres.module';
import UserController from './user.controller';
import { userProviders } from './providers/user.provider';
import { UserService } from './user.service';
import { favouritesProviders } from '../favourites/provider/favourites.provider';
import { UserRepository } from './user.repository';
import { SettingsRepository } from '../settings/settings.repository';
import { settingsProviders } from '../settings/provider/settings.provider';
import { databaseProviders } from 'src/postgres/postgres.provider';
import { FakerService } from 'src/utils/faker/faker.service';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...userProviders,
    UserService,
    ...favouritesProviders,
    UserRepository,
    ...settingsProviders,
    SettingsRepository,
    ...databaseProviders,
    FakerService,
  ],
  controllers: [UserController],
})
export class UserModule {}
