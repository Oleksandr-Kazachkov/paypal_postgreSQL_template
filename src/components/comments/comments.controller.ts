import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from '../products/product.service';
import { UserRepository } from '../user/user.repository';
import PostCommetDto from './dto/post.comment.dto';

@Controller()
export class CommentController {
  constructor(
    private readonly productService: ProductService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('/post-comment')
  async postComment(@Body() postCommetDto: PostCommetDto) {
    const user = await this.userRepository.findOneById(postCommetDto.user_id);
    postCommetDto.user = user;
    return await this.productService.postComment(postCommetDto);
  }
}
