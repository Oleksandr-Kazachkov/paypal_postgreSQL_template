import { DataSource } from 'typeorm';
import { CommentsEntity } from '../entity/comments.entity';

export const commentsProviders = [
  {
    provide: 'COMMENTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(CommentsEntity),
    inject: ['DATA_SOURCE'],
  },
];
