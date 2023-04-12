import { DataSource } from 'typeorm';
import { LikesEntity } from '../entity/likes.entity';

export const likesProviders = [
  {
    provide: 'LIKES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(LikesEntity),
    inject: ['DATA_SOURCE'],
  },
];
