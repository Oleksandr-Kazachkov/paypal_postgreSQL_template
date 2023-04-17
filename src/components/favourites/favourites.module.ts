import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/postgres/postgres.module';
import { FakerService } from 'src/utils/faker/faker.service';
import { ProductRepository } from '../products/product.repository';
import { productProviders } from '../products/providers/product.provider';
import { settingsProviders } from '../settings/provider/settings.provider';
import { SettingsRepository } from '../settings/settings.repository';
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
    ...settingsProviders,
    SettingsRepository,
    ProductRepository,
    FavouriteService,
    FavouriteRepository,
    UserRepository,
    FakerService,
  ],
  controllers: [FavouriteController],
})
export class FavouritesModule {}
