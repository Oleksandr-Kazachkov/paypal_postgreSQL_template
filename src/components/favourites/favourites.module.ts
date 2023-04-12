import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/postgres/postgres.module';
import { ProductRepository } from '../products/product.repository';
import { productProviders } from '../products/providers/product.provider';
import { userProviders } from '../user/providers/user.provider';
import { UserRepository } from '../user/user.repository';
import { FavouriteController } from './favourite.controller';
import { FavouriteRepository } from './favourite.repository';
import { FavouriteService } from './favourite.service';
import { favouritesProviders } from './provider/favourites.provider';

@Module({
  imports: [DatabaseModule],
  providers: [
    ...favouritesProviders,
    ...userProviders,
    ...productProviders,
    ProductRepository,
    FavouriteService,
    FavouriteRepository,
    UserRepository,
  ],
  controllers: [FavouriteController],
})
export class FavouritesModule {}
