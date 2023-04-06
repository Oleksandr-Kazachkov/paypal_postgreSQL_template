import { DataSource } from 'typeorm';
import { Invoice } from './entity/invoice.entity';

export const invoiceProviders = [
  {
    provide: 'INVOICE_REPOSITORY',
    useFactory: (dataSource: DataSource) => dataSource.getRepository(Invoice),
    inject: ['DATA_SOURCE'],
  },
];
