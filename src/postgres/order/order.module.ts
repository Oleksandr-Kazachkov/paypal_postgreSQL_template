import { Module } from '@nestjs/common';
import { DatabaseModule } from '../postgres.module';
import { orderProviders } from './providers/order.provider';
import { OrderService } from './order.service';

@Module({
  imports: [DatabaseModule],
  providers: [...orderProviders, OrderService],
  controllers: [],
})
export class OrderModule {}
