import { faker } from '@faker-js/faker';
import createInvoiceDto from 'src/components/invoices/dto/create.invoice.dto';
import CreateOrderDto from 'src/components/order/dto/create.order.dto';
import CreateOrderProductsDto from 'src/components/order/dto/create.order.products.dto';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { UserEntity } from 'src/components/user/entity/user.entity';

export class FakerService {
  status = ['PENDING', 'COMPLETED'];

  createRandomUser(): Partial<UserEntity> {
    return {
      id: faker.datatype.number(),
      user_paypal_id: faker.datatype.uuid(),
      name: faker.internet.userName(),
      email: faker.internet.email(),
      password: faker.internet.password(),
      settings: faker.datatype.number(),
    };
  }

  createRandomOrder(): CreateOrderDto {
    return {
      user: faker.datatype.number({ min: 0, max: 996 }),
      status: faker.helpers.arrayElement(Object.values(this.status)),
    };
  }

  createRandomInvoice(): createInvoiceDto {
    return {
      data: { data: faker.datatype.json() },
      order: faker.datatype.number({ min: 0, max: 1000 }),
      price: faker.datatype.number(),
      status: faker.helpers.arrayElement(Object.values(this.status)),
    };
  }

  createRandomOrderProducts(): CreateOrderProductsDto {
    return {
      order: faker.datatype.number({ min: 1, max: 600 }),
      product: faker.datatype.number({ min: 1, max: 2 }),
    };
  }

  createRandomProducts(): Partial<ProductEntity> {
    return {
      name: faker.datatype.string(),
      description: faker.datatype.string(),
      type: 'DIGITAL',
      category: 'OTHER',
      price: faker.datatype.number(),
      currency: 'usd',
      product_paypal_id: faker.datatype.string(),
      product_grade: faker.datatype.number({ min: 0, max: 10 }),
    };
  }
}
