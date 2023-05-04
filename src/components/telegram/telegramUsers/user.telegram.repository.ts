import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import CreateUserTelegramDto from './telegramUser.dto';
import { UserTelegramEntity } from './user.telegram.entity';

@Injectable()
export class TelegramUserRepository {
  constructor(
    @Inject('USER_TELEGRAM_REPOSITORY')
    private telegramUserRepository: Repository<UserTelegramEntity>,
  ) {}

  async save(createTelegramUserDto: CreateUserTelegramDto) {
    return await this.telegramUserRepository.save({
      chatId: createTelegramUserDto.chatId,
      first_name: createTelegramUserDto.first_name,
      username: createTelegramUserDto.username,
      telegram_token: createTelegramUserDto.telegram_token,
    });
  }

  async findAll() {
    return await this.telegramUserRepository.find();
  }
}
