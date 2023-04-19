import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import AddToFavouriteDto from './dto/add.favourite.dto';
import { FavouritesEntity } from './entity/favourites.entity';

@Injectable()
export class FavouriteRepository {
  constructor(
    @Inject('FAVOURITES_REPOSITORY')
    private favouritesRepository: Repository<FavouritesEntity>,
  ) {}

  async addToFavourites(addToFavouriteDto: AddToFavouriteDto) {
    return await this.favouritesRepository.save({
      user: addToFavouriteDto.user,
      product: addToFavouriteDto.product.id,
      product_paypal_id: addToFavouriteDto.product.product_paypal_id,
    });
  }
}
