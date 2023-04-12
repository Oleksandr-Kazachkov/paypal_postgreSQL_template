import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { UserEntity } from './entity/user.entity';
import CreateUserDto from './dto/create.user.dto';
import { createRandomUser } from 'src/utils/faker/faker.service';

@Injectable()
export class UserRepository {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<UserEntity>,
  ) {}

  async findOneById(user_paypal_id: string): Promise<UserEntity> {
    return this.userRepository.findOneBy({ user_paypal_id: user_paypal_id });
  }

  async save(createUserDto: CreateUserDto): Promise<UserEntity> {
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
}
