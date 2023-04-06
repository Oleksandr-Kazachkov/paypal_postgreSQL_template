import { Module } from '@nestjs/common';
import { DatabaseModule } from '../postgres.module';
import { invoiceProviders } from './providers/invoice.provider';
import { InvoiceService } from './invoice.service';

@Module({
  imports: [DatabaseModule],
  providers: [...invoiceProviders, InvoiceService],
  controllers: [],
})
export class InvoiceModule {}
