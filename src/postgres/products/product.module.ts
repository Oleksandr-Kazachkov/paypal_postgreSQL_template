import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaypalModule } from 'src/paypal/paypal.module';
import { PaypalService } from 'src/paypal/paypal.service';
import { DatabaseModule } from '../postgres.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { likesProviders } from './providers/likes.provider';
import { productProviders } from './providers/product.provider';

@Module({
  imports: [DatabaseModule, PaypalModule, HttpModule],
  providers: [
    ...productProviders,
    ProductService,
    PaypalService,
    ...likesProviders,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
