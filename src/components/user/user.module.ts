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
import { GoogleStrategy } from '../guards/google.strategy';
import { GoogleModule } from '../guards/google/google.module';
import { GoogleService } from '../guards/google/google.service';

@Module({
  imports: [DatabaseModule, ElasticSearchModule, GoogleModule],
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
    GoogleStrategy,
    GoogleService,
  ],
  controllers: [UserController],
})
export class UserModule {}
