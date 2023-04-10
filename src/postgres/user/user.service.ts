import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import createUserDto from './dto/create.user.dto';
import { User } from './entity/user.entity';
import { createRandomUser } from '../faker/faker.service';
import AddToFavouriteDto from './dto/add.favourite.dto';
import { Favourites } from './entity/favourites.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
    @Inject('FAVOURITES_REPOSITORY')
    private favouritesRepository: Repository<Favourites>,
  ) {}

  async findOne(user_paypal_id: string): Promise<User> {
    return this.userRepository.findOneBy({
      user_paypal_id: user_paypal_id,
    });
  }

  async createUser(createUserDto: createUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }

  async createUsers(userAmount: any) {
    const users = [];

    for (let i = 0; i < userAmount.amount; i++) {
      const user = createRandomUser();
      users.push(user);
    }

    return users.forEach(async () => {
      await this.userRepository.save(createRandomUser());
    });
  }

  async addToFavouritres(addToFavouriteDto: AddToFavouriteDto) {
    const user = await this.findOne(addToFavouriteDto.userPaypalId);

    addToFavouriteDto.userId = user.id;

    await this.favouritesRepository.save({
      user: user.id,
      product: addToFavouriteDto.product.id,
      product_paypal_id: addToFavouriteDto.product.product_paypal_id,
    });
  }
}
