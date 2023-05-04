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
import { ElasticSearchModule } from '../elasticSearch/elasticSearch.module';
import { userTelegramProviders } from '../telegram/telegramUsers/user.telegram.provider';
import { TelegramUserRepository } from '../telegram/telegramUsers/user.telegram.repository';

@Module({
  imports: [DatabaseModule, ElasticSearchModule],
  providers: [
    ...userProviders,
    UserService,
    ...favouritesProviders,
    UserRepository,
    ...settingsProviders,
    SettingsRepository,
    ...databaseProviders,
    FakerService,
    ...userTelegramProviders,
    TelegramUserRepository,
  ],
  controllers: [UserController],
})
export class UserModule {}
