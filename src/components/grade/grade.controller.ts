import { Body, Controller, Post } from '@nestjs/common';
import { ProductService } from '../products/product.service';
import { UserRepository } from '../user/user.repository';
import PostGradeDto from './dto/post.grade.dto';

@Controller()
export class GradeController {
  constructor(
    private readonly productService: ProductService,
    private readonly userRepository: UserRepository,
  ) {}

  @Post('/post-grade')
  async postGrade(@Body() postGradeDto: PostGradeDto) {
    const user = await this.userRepository.findOneById(postGradeDto.user_id);
    postGradeDto.user = user;
    return await this.productService.postGrade(postGradeDto);
  }
}
