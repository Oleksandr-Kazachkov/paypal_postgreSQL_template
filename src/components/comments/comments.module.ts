import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaypalService } from 'src/paypal/paypal.service';
import { databaseProviders } from 'src/postgres/postgres.provider';
import { FakerService } from 'src/utils/faker/faker.service';
import { GradeRepository } from '../grade/grade.repository';
import { gradeProviders } from '../grade/provider/grade.provider';
import { LikesRepository } from '../likes/likes.repository';
import { likesProviders } from '../likes/provider/likes.provider';
import { ProductRepository } from '../products/product.repository';
import { ProductService } from '../products/product.service';
import { productProviders } from '../products/providers/product.provider';
import { settingsProviders } from '../settings/provider/settings.provider';
import { SettingsRepository } from '../settings/settings.repository';
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
    ...settingsProviders,
    SettingsRepository,
    UserRepository,
    GradeRepository,
    LikesRepository,
    ProductRepository,
    CommentsRepository,
    ProductService,
    PaypalService,
    FakerService,
  ],
  controllers: [CommentController],
})
export class CommentsModule {}
