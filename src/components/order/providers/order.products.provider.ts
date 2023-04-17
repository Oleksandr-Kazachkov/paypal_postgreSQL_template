import { DataSource } from 'typeorm';
import { OrderProductsEntity } from '../entity/order.products.entity';

export const orderProductsProviders = [
  {
    provide: 'ORDER_PRODUCTS_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(OrderProductsEntity),
    inject: ['DATA_SOURCE'],
  },
];
