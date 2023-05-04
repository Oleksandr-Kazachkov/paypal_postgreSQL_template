import { Controller, Get } from '@nestjs/common';
import { TelegramUpdate } from './telegram.service';

@Controller('/telegram')
export class TelegramController {
  constructor(private readonly telegramService: TelegramUpdate) {}

  @Get('/get-stats-by-day')
  async getStatsByDay() {
    return await this.telegramService.reply();
  }
}
