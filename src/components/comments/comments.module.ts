import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaypalService } from 'src/paypal/paypal.service';
import { databaseProviders } from 'src/postgres/postgres.provider';
import { GradeRepository } from '../grade/grade.repository';
import { gradeProviders } from '../grade/provider/grade.provider';
import { LikesRepository } from '../likes/likes.repository';
import { likesProviders } from '../likes/provider/likes.provider';
import { ProductRepository } from '../products/product.repository';
import { ProductService } from '../products/product.service';
import { productProviders } from '../products/providers/product.provider';
import { userProviders } from '../user/providers/user.provider';
import { UserRepository } from '../user/user.repository';
import { CommentController } from './comments.controller';
import { CommentsRepository } from './comments.repository';
import { commentsProviders } from './provider/comments.provider';

@Module({
  imports: [HttpModule],
  providers: [
    ...commentsProviders,
    ...databaseProviders,
    ...productProviders,
    ...likesProviders,
    ...gradeProviders,
    ...userProviders,
    UserRepository,
    GradeRepository,
    LikesRepository,
    ProductRepository,
    CommentsRepository,
    ProductService,
    PaypalService,
  ],
  controllers: [CommentController],
})
export class CommentsModule {}
