import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TelegrafModule } from 'nestjs-telegraf';
import { TelegramUpdate } from './telegram.service';
import { OrderRepository } from '../order/order.repository';
import { orderProviders } from '../order/providers/order.provider';
import { FakerService } from 'src/utils/faker/faker.service';
import { databaseProviders } from 'src/postgres/postgres.provider';
import { TelegramController } from './telegram.controller';
import { userTelegramProviders } from './telegramUsers/user.telegram.provider';
import { TelegramUserRepository } from './telegramUsers/user.telegram.repository';
import { ScheduleModule } from '@nestjs/schedule';
import { UserRepository } from '../user/user.repository';
import { userProviders } from '../user/providers/user.provider';

@Module({
  imports: [
    TelegrafModule.forRootAsync({
      useFactory: () => ({
        token: '6115836786:AAH6Tr0Gv6y85LxKwGbrX1s5wpc5ge6m0F4',
      }),
    }),
    ConfigModule.forRoot(),
    ScheduleModule.forRoot(),
  ],
  providers: [
    ConfigService,
    TelegramUpdate,
    OrderRepository,
    FakerService,
    TelegramUserRepository,
    UserRepository,
    ...userProviders,
    ...userTelegramProviders,
    ...databaseProviders,
    ...orderProviders,
  ],
  controllers: [TelegramController],
})
export class TelegramModule {}
