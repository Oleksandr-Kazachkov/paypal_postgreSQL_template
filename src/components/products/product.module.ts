import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaypalModule } from 'src/paypal/paypal.module';
import { PaypalService } from 'src/paypal/paypal.service';
import { ProductRepository } from './product.repository';
import { DatabaseModule } from 'src/postgres/postgres.module';
import { ProductController } from './product.controller';
import { ProductService } from './product.service';
import { commentsProviders } from '../comments/provider/comments.provider';
import { gradeProviders } from '../grade/provider/grade.provider';
import { likesProviders } from '../likes/provider/likes.provider';
import { productProviders } from './providers/product.provider';
import { LikesRepository } from '../likes/likes.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { GradeRepository } from '../grade/grade.repository';

@Module({
  imports: [DatabaseModule, PaypalModule, HttpModule],
  providers: [
    ...productProviders,
    ...likesProviders,
    ...commentsProviders,
    ...gradeProviders,
    ProductService,
    PaypalService,
    ProductRepository,
    LikesRepository,
    CommentsRepository,
    GradeRepository,
  ],
  controllers: [ProductController],
})
export class ProductModule {}
