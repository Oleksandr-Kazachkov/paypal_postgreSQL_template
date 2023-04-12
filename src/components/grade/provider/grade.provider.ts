import { DataSource } from 'typeorm';
import { GradeEntity } from '../entity/grade.entity';

export const gradeProviders = [
  {
    provide: 'GRADE_REPOSITORY',
    useFactory: (dataSource: DataSource) =>
      dataSource.getRepository(GradeEntity),
    inject: ['DATA_SOURCE'],
  },
];
