import { HttpService } from '@nestjs/axios';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
import { PaypalService } from 'src/paypal/paypal.service';
import { EntityMetadataNotFoundError, Repository } from 'typeorm';
import createProductDto from './dto/create.product.dto';
import PostCommetDto from './dto/post.comment.dto';
import PostGradeDto from './dto/post.grade.dto';
import PostLikeDto from './dto/post.like.dto';
import { Comments } from './entity/comments.entity';
import { Grade } from './entity/grade.entity';
import { Likes } from './entity/likes.entity';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    @Inject('LIKES_REPOSITORY')
    private likesRepository: Repository<Likes>,
    @Inject('COMMENTS_REPOSITORY')
    private commentsRepository: Repository<Comments>,
    @Inject('GRADE_REPOSITORY')
    private gradeRepository: Repository<Grade>,
    private readonly paypalService: PaypalService,
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async createProduct(createProductDto: createProductDto): Promise<Product> {
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

  async findOne(product_paypal_id: string): Promise<Product> {
    return this.productRepository.findOneBy({
      product_paypal_id: product_paypal_id,
    });
  }

  async postLike(postLikeDto: PostLikeDto) {
    const product = await this.findOne(postLikeDto.product_id);

    console.log(postLikeDto.user.id);

    product.amountOfLikes += 1;
    await this.productRepository.update(
      {
        product_paypal_id: postLikeDto.product_id,
      },
      { amountOfLikes: product.amountOfLikes + 1 },
    );

    const like = this.likesRepository.save({
      user: postLikeDto.user.id,
      product: product.id,
      product_paypal_id: product.product_paypal_id,
    });

    return like;
  }

  async postComment(postCommentDto: PostCommetDto) {
    const product = await this.findOne(postCommentDto.product_id);

    if (product) {
      const comment = await this.commentsRepository.save({
        comment_data: postCommentDto.comment_data,
        user: postCommentDto.user.id,
        product: product.id,
        product_paypal_id: product.product_paypal_id,
      });

      return comment;
    }

    throw new EntityMetadataNotFoundError('Product was not found');
  }

  async postGrade(postGradeDto: PostGradeDto) {
    const product = await this.findOne(postGradeDto.product_id);

    if (product) {
      const grade = await this.gradeRepository.save({
        grade: postGradeDto.grade,
        user: postGradeDto.user.id,
        product: product.id,
        product_paypal_id: product.product_paypal_id,
      });

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
