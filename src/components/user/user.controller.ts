import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from './dto/create.user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';

@Controller('/users')
export default class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('/create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);

    return user;
  }

  @Post('/create-random-user')
  async createRandomUser(@Body() amount: number) {
    const response = await this.userRepository.createUsers(amount);

    return response;
  }
}
