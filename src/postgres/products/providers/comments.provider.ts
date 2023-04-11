import { DataSource } from 'typeorm';
import { Comments } from '../entity/comments.entity';

export const comentsProviders = [
  {
    provide: 'COMMENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Comments),
    inject: ['DATA_SOURCE'],
  },
];
