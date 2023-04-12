import { faker } from '@faker-js/faker';
import { UserEntity } from 'src/components/user/entity/user.entity';

export function createRandomUser(): Partial<UserEntity> {
  return {
    id: faker.datatype.number(),
    user_paypal_id: faker.datatype.uuid(),
    name: faker.internet.userName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
  };
}
