import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaypalService } from './paypal.service';

@Module({
  imports: [HttpModule],
  providers: [PaypalService],
  controllers: [],
})
export class PaypalModule {}
