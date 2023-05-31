import {
  Body,
  Controller,
  Get,
  Post,
  Query,
  Req,
  UseGuards,
} from '@nestjs/common';
import CreateUserDto from './dto/create.user.dto';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { TelegramUserRepository } from '../telegram/telegramUsers/user.telegram.repository';
import { GoogleService } from '../guards/google/google.service';
import { AuthGuard } from '@nestjs/passport';
@Controller('/users')
export default class UserController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly userService: UserService,
    private readonly userTelegramRepository: TelegramUserRepository,
    private readonly googleService: GoogleService,
  ) {}

  @Post('/create-user')
  async createUser(@Body() createUserDto: CreateUserDto) {
    const user = await this.userRepository.save(createUserDto);

    await this.userTelegramRepository.save({
      first_name: createUserDto.name,
    });

    return user;
  }

  @Get('/create-user-from-google')
  @UseGuards(AuthGuard('google'))
  async createUserFromGoogle(@Req() req) {
    req.user.password = 'googleAuth';
    const user = await this.userRepository.save(req.user);
    await this.userTelegramRepository.save({
      first_name: req.user.name,
    });

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
    return await this.userService.usersByMonth(year);
  }

  @Post('/bulc-users')
  async bulcItems() {
    return await this.userService.migrateData();
  }
}
