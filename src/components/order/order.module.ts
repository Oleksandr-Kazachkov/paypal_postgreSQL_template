import { Module } from '@nestjs/common';
import { DatabaseModule } from 'src/postgres/postgres.module';
import { orderProviders } from './providers/order.provider';
import { OrderService } from './order.service';
import { PaypalModule } from 'src/paypal/paypal.module';
import { OrderController } from './order.controller';
import { PaypalService } from 'src/paypal/paypal.service';
import { HttpModule } from '@nestjs/axios';
import { UserService } from '../user/user.service';
import { UserModule } from '../user/user.module';
import { userProviders } from '../user/providers/user.provider';
import { favouritesProviders } from '../favourites/provider/favourites.provider';
import { ProductService } from '../products/product.service';
import { productProviders } from '../products/providers/product.provider';
import { likesProviders } from '../likes/provider/likes.provider';
import { commentsProviders } from '../comments/provider/comments.provider';
import { gradeProviders } from '../grade/provider/grade.provider';
import { ProductRepository } from '../products/product.repository';
import { LikesRepository } from '../likes/likes.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { GradeRepository } from '../grade/grade.repository';
import { OrderRepository } from './order.repository';
import { UserRepository } from '../user/user.repository';
import { settingsProviders } from '../settings/provider/settings.provider';
import { SettingsRepository } from '../settings/settings.repository';
import { OrderProductsEntity } from './entity/order.products.entity';
import { orderProductsProviders } from './providers/order.products.provider';
import { OrderProductsRepository } from './order.products.repository';
import { FakerService } from 'src/utils/faker/faker.service';

@Module({
  imports: [DatabaseModule, PaypalModule, OrderModule, HttpModule, UserModule],
  providers: [
    ...orderProviders,
    ...userProviders,
    ...favouritesProviders,
    ...productProviders,
    ...likesProviders,
    ...commentsProviders,
    ...gradeProviders,
    ...settingsProviders,
    ...orderProductsProviders,
    OrderProductsRepository,
    OrderProductsEntity,
    SettingsRepository,
    OrderService,
    PaypalService,
    OrderService,
    UserService,
    ProductService,
    ProductRepository,
    LikesRepository,
    CommentsRepository,
    GradeRepository,
    OrderRepository,
    UserRepository,
    FakerService,
  ],
  controllers: [OrderController],
})
export class OrderModule {}
