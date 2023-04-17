import { HttpModule } from '@nestjs/axios';
import { Module } from '@nestjs/common';
import { PaypalService } from 'src/paypal/paypal.service';
import { databaseProviders } from 'src/postgres/postgres.provider';
import { FakerService } from 'src/utils/faker/faker.service';
import { CommentsRepository } from '../comments/comments.repository';
import { commentsProviders } from '../comments/provider/comments.provider';
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
import { GradeController } from './grade.controller';

@Module({
  imports: [HttpModule],
  providers: [
    ...gradeProviders,
    ...databaseProviders,
    ...productProviders,
    ...likesProviders,
    ...gradeProviders,
    ...userProviders,
    ...commentsProviders,
    ...settingsProviders,
    SettingsRepository,
    UserRepository,
    GradeRepository,
    LikesRepository,
    ProductRepository,
    GradeRepository,
    ProductService,
    PaypalService,
    CommentsRepository,
    FakerService,
  ],
  controllers: [GradeController],
})
export class GradeModule {}
