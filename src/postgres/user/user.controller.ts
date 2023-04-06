import { Body, Controller, Post } from '@nestjs/common';
import CreateUserDto from './dto/create.user.dto';
import { UserService } from './user.service';

@Controller()
export default class UserController {
  constructor(private readonly userService: UserService) {}

  @Post('/createUser')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userService.createUser(createUserDto);

    return user;
  }
}
