import { Update, Ctx, Start, Help, On, Hears } from 'nestjs-telegraf';
import { OrderRepository } from '../order/order.repository';
import { Telegraf } from 'telegraf';
import { TelegramUserRepository } from './telegramUsers/user.telegram.repository';
import { Cron } from '@nestjs/schedule';
import TelegramResponce from './telegramUsers/telegram.responce.constructor';
import { UserRepository } from '../user/user.repository';
import { NotFoundException } from '@nestjs/common';

@Update()
export class TelegramUpdate {
  constructor(
    private readonly orderRepository: OrderRepository,
    private readonly telegramUserRepository: TelegramUserRepository,
    private readonly userRepository: UserRepository,
  ) {}
  @Start()
  async start(@Ctx() ctx: any) {
    const user = await this.userRepository.findByName(
      ctx.message.chat.first_name,
    );

    if (!user) {
      await ctx.reply('User not found');
      throw new NotFoundException();
    }

    await this.telegramUserRepository.save({
      chatId: ctx.message.chat.id,
      first_name: ctx.message.chat.first_name,
      username: ctx.message.chat.username,
      telegram_token: ctx.telegram.token,
    });

    await ctx.reply('Welcome');
  }

  @Help()
  async help(@Ctx() ctx: any) {
    await ctx.reply('Send me a sticker');
  }

  @On('sticker')
  async on(@Ctx() ctx: any) {
    await ctx.reply('👍');
  }

  @Hears('Hi')
  async hears(@Ctx() ctx: any) {
    await ctx.reply('Hey there');
  }

  @Cron('0 23 * * *')
  async reply() {
    const chatIds = await this.telegramUserRepository.findAll();

    const order = await this.orderRepository.findForReport();

    console.log(order);

    chatIds.forEach((el) => {
      const app = new Telegraf(el.telegram_token);

      const responce = new TelegramResponce(order).generateResponce();
      chatIds.forEach((el) => {
        app.telegram.sendMessage(el.chatId, responce);
      });
    });
  }
}
