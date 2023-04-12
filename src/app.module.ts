import { Module } from '@nestjs/common';
import { PaypalModule } from './paypal/paypal.module';
import { PaypalService } from './paypal/paypal.service';
import { DatabaseModule } from './postgres/postgres.module';
import { databaseProviders } from './postgres/postgres.provider';
import { UserModule } from './components/user/user.module';
import { userProviders } from './components/user/providers/user.provider';
import { UserService } from './components/user/user.service';
import { ConfigModule } from '@nestjs/config';
import { HttpModule } from '@nestjs/axios';
import { favouritesProviders } from './components/favourites/provider/favourites.provider';
import { InvoiceService } from './components/invoices/invoice.service';
import { invoiceProviders } from './components/invoices/providers/invoice.provider';
import { OrderModule } from './components/order/order.module';
import { OrderService } from './components/order/order.service';
import { orderProviders } from './components/order/providers/order.provider';
import { ProductModule } from './components/products/product.module';
import { ProductService } from './components/products/product.service';
import { commentsProviders } from './components/comments/provider/comments.provider';
import { gradeProviders } from './components/grade/provider/grade.provider';
import { likesProviders } from './components/likes/provider/likes.provider';
import { productProviders } from './components/products/providers/product.provider';
import { ProductRepository } from './components/products/product.repository';
import { LikesRepository } from './components/likes/likes.repository';
import { CommentsRepository } from './components/comments/comments.repository';
import { GradeRepository } from './components/grade/grade.repository';
import { InvoiceRepository } from './components/invoices/invoice.repository';
import { OrderRepository } from './components/order/order.repository';
import { UserRepository } from './components/user/user.repository';
import UserController from './components/user/user.controller';
import { LikeController } from './components/likes/like.controller';
import { OrderController } from './components/order/order.controller';
import { ProductController } from './components/products/product.controller';
import { PaypalController } from './paypal/paypal.controller';
import { FavouritesModule } from './components/favourites/favourites.module';
import { CommentsModule } from './components/comments/comments.module';
import { GradeModule } from './components/grade/grade.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '../.env',
      isGlobal: true,
    }),
    DatabaseModule,
    UserModule,
    PaypalModule,
    ProductModule,
    OrderModule,
    HttpModule,
    FavouritesModule,
    CommentsModule,
    GradeModule,
  ],
  controllers: [
    UserController,
    LikeController,
    OrderController,
    ProductController,
    PaypalController,
  ],
  providers: [
    PaypalService,
    OrderService,
    InvoiceService,
    UserService,
    ProductService,
    ProductRepository,
    LikesRepository,
    CommentsRepository,
    GradeRepository,
    InvoiceRepository,
    OrderRepository,
    UserRepository,
    ...orderProviders,
    ...databaseProviders,
    ...invoiceProviders,
    ...userProviders,
    ...productProviders,
    ...likesProviders,
    ...favouritesProviders,
    ...commentsProviders,
    ...gradeProviders,
  ],
})
export class AppModule {}
