import { DataSource } from 'typeorm';
import { UserTelegramEntity } from './user.telegram.entity';

export const userTelegramProviders = [
  {
    provide: 'USER_TELEGRAM_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(UserTelegramEntity),
    inject: ['DATA_SOURCE'],
  },
];
