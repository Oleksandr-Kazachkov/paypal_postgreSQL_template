import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import PostCommetDto from './dto/post.comment.dto';
import { CommentsEntity } from './entity/comments.entity';

@Injectable()
export class CommentsRepository {
  constructor(
    @Inject('COMMENTS_REPOSITORY')
    private commentsRepository: Repository<CommentsEntity>,
  ) {}

  async save(postCommentDto: PostCommetDto) {
    return await this.commentsRepository.save({
      comment_data: postCommentDto.comment_data,
      user: postCommentDto.user.id,
      product: postCommentDto.product.id,
      product_paypal_id: postCommentDto.product.product_paypal_id,
    });
  }
}
