import { Body, Controller, Post } from '@nestjs/common';
import { ProductRepository } from '../products/product.repository';
import AddToFavouriteDto from './dto/add.favourite.dto';
import { FavouriteRepository } from './favourite.repository';

@Controller()
export class FavouriteController {
  constructor(
    private readonly productRepository: ProductRepository,
    private readonly favouritesRepository: FavouriteRepository,
  ) {}

  @Post('/add-to-favourites')
  async addToFavourites(@Body() addToFavouritesDto: AddToFavouriteDto) {
    const product = await this.productRepository.findOne(
      addToFavouritesDto.productId,
    );

    addToFavouritesDto.product = product;

    return await this.favouritesRepository.addToFavourites(addToFavouritesDto);
  }
}
