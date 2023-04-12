import { DataSource } from 'typeorm';
import { InvoiceEntity } from '../entity/invoice.entity';

export const invoiceProviders = [
  {
    provide: 'INVOICE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(InvoiceEntity),
    inject: ['DATA_SOURCE'],
  },
];
