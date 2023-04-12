import { Inject, Injectable } from '@nestjs/common';
import { Repository } from 'typeorm';
import { PickKeysByType } from 'typeorm/common/PickKeysByType';
import PostGradeDto from './dto/post.grade.dto';
import { GradeEntity } from './entity/grade.entity';

@Injectable()
export class GradeRepository {
  constructor(
    @Inject('GRADE_REPOSITORY')
    private gradeRepository: Repository<GradeEntity>,
  ) {}

  async save(postGradeDto: PostGradeDto) {
    return await this.gradeRepository.save({
      grade: postGradeDto.grade,
      user: postGradeDto.user.id,
      product: postGradeDto.product.id,
      product_paypal_id: postGradeDto.product.product_paypal_id,
    });
  }

  async average(
    columnName: PickKeysByType<GradeEntity, number>,
    where: object,
  ) {
    return await this.gradeRepository.average(columnName, where);
  }
}
