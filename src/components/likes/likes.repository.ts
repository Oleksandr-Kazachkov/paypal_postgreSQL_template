import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import PostLikeDto from './dto/post.like.dto';
import { LikesEntity } from './entity/likes.entity';

@Injectable()
export class LikesRepository {
  constructor(
    @Inject('LIKES_REPOSITORY')
    private likesRepository: Repository<LikesEntity>,
  ) {}

  async save(postLikeDto: PostLikeDto) {
    return await this.likesRepository.save({
      user: postLikeDto.user.id,
      product: postLikeDto.product.id,
      product_paypal_id: postLikeDto.product.product_paypal_id,
    });
  }
}
