import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import CreateUserDto from './dto/create.user.dto';
import { UserRepository } from './user.repository';

@Controller('/users')
export default class UserController {
  constructor(private readonly userRepository: UserRepository) {}

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

  @Get('/find-one-with-settings')
  async findOneUser(@Body() userId: any) {
    return await this.userRepository.findOneWithSettings(userId.userId);
  }

  @Get('/find-one-with-orders')
  async findOneUserWithOrders(@Body() userId: any) {
    return await this.userRepository.findOneWithOrders(userId.userId);
  }

  @Get('/find-users-by-month')
  async findUsersByMonth(@Query() year: number) {
    return await this.userRepository.usersByMonth(year);
  }
}
