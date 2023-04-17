import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { InvoiceRepository } from 'src/components/invoices/invoice.repository';
import { InvoiceService } from 'src/components/invoices/invoice.service';
import { invoiceProviders } from 'src/components/invoices/providers/invoice.provider';
import { OrderRepository } from 'src/components/order/order.repository';
import { orderProviders } from 'src/components/order/providers/order.provider';
import { databaseProviders } from 'src/postgres/postgres.provider';
import { FakerService } from 'src/utils/faker/faker.service';
import { PaypalController } from './paypal.controller';
import { PaypalService } from './paypal.service';

@Module({
  imports: [HttpModule],
  providers: [
    PaypalService,
    OrderRepository,
    InvoiceService,
    InvoiceRepository,
    FakerService,
    ...invoiceProviders,
    ...orderProviders,
    ...databaseProviders,
  ],
  controllers: [PaypalController],
})
export class PaypalModule {}
