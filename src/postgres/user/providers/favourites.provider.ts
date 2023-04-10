import { DataSource } from 'typeorm';
import { Favourites } from '../entity/favourites.entity';
export const favouritesProviders = [
  {
    provide: 'FAVOURITES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(Favourites),
    inject: ['DATA_SOURCE'],
  },
];
