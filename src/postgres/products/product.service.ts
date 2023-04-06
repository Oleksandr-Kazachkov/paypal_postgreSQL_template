import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { PaypalService } from 'src/paypal/paypal.service';
import { Repository } from 'typeorm';
import createProductDto from './dto/create.product.dto';
import { Product } from './entity/product.entity';

@Injectable()
export class ProductService {
  constructor(
    @Inject('PRODUCT_REPOSITORY')
    private productRepository: Repository<Product>,
    private readonly paypalService: PaypalService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async createProduct(createProductDto: createProductDto): Promise<Product> {
    const accessToken = await this.paypalService.generateAccessToken();
    const url = `${this.paypalService.baseURL.sandbox}/v1/catalogs/products`;
    const product = await fetch(url, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${accessToken}`,
      },
      body: JSON.stringify({
        name: createProductDto.name,
        description: createProductDto.description,
        type: createProductDto.type,
        category: createProductDto.category,
      }),
    });

    createProductDto.product_paypal_id = (await product.json()).id;

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
}
