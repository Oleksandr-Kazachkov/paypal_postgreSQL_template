import { Inject, Injectable } from '@nestjs/common';
import createProductDto from 'src/components/products/dto/create.product.dto';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { FakerService } from 'src/utils/faker/faker.service';
import { FindOptionsOrderValue, Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
    private readonly fakerService: FakerService,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(product_id: number): Promise<ProductEntity> {
    return this.productRepository.findOneBy({
      id: product_id,
    });
  }

  async findAllByPrice() {
    return this.productRepository.find({
      order: {
        price: 'ASC',
      },
    });
  }

  async findAllByGrade(sortBy: FindOptionsOrderValue) {
    return this.productRepository.find({
      order: {
        product_grade: sortBy,
      },
    });
  }

  async save(createProductDto: createProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async update(where: object, partialEntity: object) {
    return await this.productRepository.update(where, partialEntity);
  }

  async createProducts(userAmount: any) {
    for (let i = 0; i < userAmount.amount; i++) {
      await this.productRepository.save(
        this.fakerService.createRandomProducts(),
      );
    }
  }
}
