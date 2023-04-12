import { DataSource } from 'typeorm';
import { FavouritesEntity } from '../entity/favourites.entity';
export const favouritesProviders = [
  {
    provide: 'FAVOURITES_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(FavouritesEntity),
    inject: ['DATA_SOURCE'],
  },
];
