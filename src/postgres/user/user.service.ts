import { Injectable, Inject } from '@nestjs/common';
import { Repository } from 'typeorm';
import createUserDto from './dto/create.user.dto';
import { User } from './entity/user.entity';

@Injectable()
export class UserService {
  constructor(
    @Inject('USER_REPOSITORY')
    private userRepository: Repository<User>,
  ) {}

  async findOne(user_paypal_id: string): Promise<User> {
    return this.userRepository.findOneBy({
      user_paypal_id: user_paypal_id,
    });
  }

  async createUser(createUserDto: createUserDto): Promise<User> {
    return this.userRepository.save(createUserDto);
  }
}
