import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/postgres/postgres.module';
import { invoiceProviders } from './providers/invoice.provider';
import { InvoiceService } from './invoice.service';
import { InvoiceController } from './invoice.controller';
import { InvoiceRepository } from './invoice.repository';
import { FakerService } from 'src/utils/faker/faker.service';
import { ElasticSearchModule } from '../elasticSearch/elasticSearch.module';

@Module({
  imports: [DatabaseModule, ElasticSearchModule],
  providers: [
    ...invoiceProviders,
    InvoiceService,
    InvoiceRepository,
    FakerService,
  ],
  controllers: [InvoiceController],
})
export class InvoiceModule {}
