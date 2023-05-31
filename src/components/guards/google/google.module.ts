import { Module } from '@nestjs/common';
import { GoogleController } from './google.controller';
import { GoogleService } from './google.service';
import { GoogleStrategy } from '../google.strategy';
import { UserService } from 'src/components/user/user.service';
import { userProviders } from 'src/components/user/providers/user.provider';
import { UserRepository } from 'src/components/user/user.repository';
import { databaseProviders } from 'src/postgres/postgres.provider';
import { FakerService } from 'src/utils/faker/faker.service';
import { OrderRepository } from 'src/components/order/order.repository';
import { orderProviders } from 'src/components/order/providers/order.provider';
import { DatabaseModule } from 'src/postgres/postgres.module';
import { ElasticSearchModule } from 'src/components/elasticSearch/elasticSearch.module';
import UserController from 'src/components/user/user.controller';
import { TelegramUserRepository } from 'src/components/telegram/telegramUsers/user.telegram.repository';
import { userTelegramProviders } from 'src/components/telegram/telegramUsers/user.telegram.provider';

@Module({
  imports: [ElasticSearchModule, DatabaseModule],
  controllers: [GoogleController],
  providers: [
    UserController,
    TelegramUserRepository,
    ...userTelegramProviders,
    GoogleService,
    GoogleStrategy,
    UserService,
    ...userProviders,
    UserRepository,
    ...databaseProviders,
    OrderRepository,
    ...orderProviders,
    FakerService,
  ],
})
export class GoogleModule {}
