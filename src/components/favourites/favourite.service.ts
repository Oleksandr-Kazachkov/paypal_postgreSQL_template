import { Injectable } from '@nestjs/common';
import { UserRepository } from '../user/user.repository';
import AddToFavouriteDto from './dto/add.favourite.dto';
import { FavouriteRepository } from './favourite.repository';

@Injectable()
export class FavouriteService {
  constructor(
    private readonly favouritesRepository: FavouriteRepository,
    private readonly userRepository: UserRepository,
  ) {}

  async addToFavouritres(addToFavouriteDto: AddToFavouriteDto) {
    const user = await this.userRepository.findOneById(addToFavouriteDto.user);

    addToFavouriteDto.userId = user.id;

    await this.favouritesRepository.addToFavourites(addToFavouriteDto);
  }
}
