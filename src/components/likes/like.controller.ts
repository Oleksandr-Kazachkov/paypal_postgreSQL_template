import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from '../products/product.service';
import { UserRepository } from '../user/user.repository';
import PostLikeDto from './dto/post.like.dto';

@Controller('/like')
export class LikeController {
  constructor(
    private readonly userRepository: UserRepository,
    private readonly productService: ProductService,
  ) {}

  @Post('/post-like')
  async postLike(@Body() postLikeDto: PostLikeDto) {
    const user = await this.userRepository.findOneById(postLikeDto.user_id);

    postLikeDto.user = user;

    return await this.productService.postLike(postLikeDto);
  }
}
