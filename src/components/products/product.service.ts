import { HttpService } from '@nestjs/axios';
import { Injectable, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PaypalService } from 'src/paypal/paypal.service';
import { ProductRepository } from './product.repository';
import { EntityMetadataNotFoundError } from 'typeorm';
import createProductDto from './dto/create.product.dto';
import PostCommetDto from '../comments/dto/post.comment.dto';
import PostGradeDto from '../grade/dto/post.grade.dto';
import PostLikeDto from '../likes/dto/post.like.dto';
import { ProductEntity } from './entity/product.entity';
import { LikesRepository } from '../likes/likes.repository';
import { CommentsRepository } from '../comments/comments.repository';
import { GradeRepository } from '../grade/grade.repository';

@Injectable()
export class ProductService {
  constructor(
    private readonly paypalService: PaypalService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
    private readonly productRepository: ProductRepository,
    private readonly likesRepository: LikesRepository,
    private readonly commentsRepository: CommentsRepository,
    private readonly gradeRepository: GradeRepository,
  ) {}

  async createProduct(
    createProductDto: createProductDto,
  ): Promise<ProductEntity> {
    const baseURL = this.configService.get('SANDBOX');
    const accessToken = await this.paypalService.generateAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `${baseURL}/v1/catalogs/products`;
    const product = await firstValueFrom(
      this.httpService.post(
        url,
        {
          name: createProductDto.name,
          description: createProductDto.description,
          type: createProductDto.type,
          category: createProductDto.category,
        },
        { headers: headers },
      ),
    );

    createProductDto.product_paypal_id = product.data.id;

    if (product) {
      const savedProduct = await this.productRepository.save(createProductDto);

      return savedProduct;
    }

    throw new BadRequestException();
  }

  async postLike(postLikeDto: PostLikeDto) {
    const product = await this.productRepository.findOne(
      postLikeDto.product_id,
    );

    postLikeDto.product = product;

    product.amountOfLikes += 1;
    await this.productRepository.update(
      {
        product_paypal_id: postLikeDto.product_id,
      },
      { amountOfLikes: product.amountOfLikes + 1 },
    );

    const like = this.likesRepository.save(postLikeDto);

    return like;
  }

  async postComment(postCommentDto: PostCommetDto) {
    const product = await this.productRepository.findOne(
      postCommentDto.product_id,
    );

    postCommentDto.product = product;

    if (product) {
      const comment = await this.commentsRepository.save(postCommentDto);

      return comment;
    }

    throw new EntityMetadataNotFoundError('Product was not found');
  }

  async postGrade(postGradeDto: PostGradeDto) {
    const product = await this.productRepository.findOne(
      postGradeDto.product_id,
    );

    postGradeDto.product = product;

    if (product) {
      const grade = await this.gradeRepository.save(postGradeDto);

      const avgGrade = await this.gradeRepository.average('grade', {
        product_paypal_id: postGradeDto.product_id,
      });

      await this.productRepository.update(
        {
          product_paypal_id: postGradeDto.product_id,
        },
        { product_grade: avgGrade },
      );

      return grade;
    }

    throw new EntityMetadataNotFoundError('Product was not found');
  }
}
