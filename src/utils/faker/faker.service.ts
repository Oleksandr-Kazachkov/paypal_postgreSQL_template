import { faker } from '@faker-js/faker';
import { InvoiceEntity } from 'src/components/invoices/entity/invoice.entity';
import { OrderEntity } from 'src/components/order/entity/order.entity';
import { UserEntity } from 'src/components/user/entity/user.entity';

export class FakerService {
  status = ['PENDING', 'COMPLETED'];

  createRandomUser(): UserEntity {
    return {
      id: faker.datatype.number(),
      user_paypal_id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      comments: faker.datatype.number(),
      settings: faker.datatype.number(),
      orders: faker.datatype.number(),
      likes: faker.datatype.number(),
    };
  }

  createRandomOrder(): OrderEntity {
    return {
      id: faker.datatype.number(),
      user: this.createRandomUser(),
      status: faker.helpers.arrayElement(Object.values(this.status)),
      user_paypal_id: faker.datatype.uuid(),
      invoice: faker.datatype.number(),
      order_products: faker.datatype.number(),
    };
  }

  createRandomInvoice(): Partial<InvoiceEntity> {
    return {
      id: faker.datatype.number(),
      data: { data: faker.datatype.json() },
      order: faker.datatype.number(),
      price: faker.datatype.number(),
      status: faker.helpers.arrayElement(Object.values(this.status)),
    };
  }
}
