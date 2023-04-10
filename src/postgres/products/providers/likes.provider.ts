import { DataSource } from 'typeorm';
import { Likes } from '../entity/likes.entity';

export const likesProviders = [
  {
    provide: 'LIKES_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Likes),
    inject: ['DATA_SOURCE'],
  },
];
