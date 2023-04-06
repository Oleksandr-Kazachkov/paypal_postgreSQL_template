import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Module({
  imports: [],
  providers: [PaypalService],
  controllers: [],
})
export class PaypalModule {}
