import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { PaypalModule } from './paypal/paypal.module';
import { PaypalService } from './paypal/paypal.service';
import { invoiceProviders } from './postgres/invoices/invoice.provider';
import { InvoiceService } from './postgres/invoices/invoice.service';
import { OrderModule } from './postgres/order/order.module';
import { orderProviders } from './postgres/order/order.provider';
import { OrderService } from './postgres/order/order.service';
import { DatabaseModule } from './postgres/postgres.module';
import { databaseProviders } from './postgres/postgres.provider';
import { ProductModule } from './postgres/products/product.module';
import { ProductService } from './postgres/products/product.service';
import { productProviders } from './postgres/products/providers/product.provider';
import { UserModule } from './postgres/user/user.module';
import { userProviders } from './postgres/user/user.provider';
import { UserService } from './postgres/user/user.service';

@Module({
  imports: [
    DatabaseModule,
    UserModule,
    PaypalModule,
    ProductModule,
    OrderModule,
  ],
  controllers: [AppController],
  providers: [
    PaypalService,
    OrderService,
    InvoiceService,
    UserService,
    ProductService,
    ...orderProviders,
    ...databaseProviders,
    ...invoiceProviders,
    ...userProviders,
    ...productProviders,
  ],
})
export class AppModule {}
