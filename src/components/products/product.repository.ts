import { Inject, Injectable } from '@nestjs/common';
import createProductDto from 'src/components/products/dto/create.product.dto';
import { ProductEntity } from 'src/components/products/entity/product.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ProductRepository {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<ProductEntity>,
  ) {}

  async findAll(): Promise<ProductEntity[]> {
    return this.productRepository.find();
  }

  async findOne(product_paypal_id: string): Promise<ProductEntity> {
    return this.productRepository.findOneBy({
      product_paypal_id: product_paypal_id,
    });
  }

  async save(createProductDto: createProductDto) {
    return await this.productRepository.save(createProductDto);
  }

  async update(where: object, partialEntity: object) {
    return await this.productRepository.update(where, partialEntity);
  }
}
