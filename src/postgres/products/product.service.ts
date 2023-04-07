import { HttpService } from '@nestjs/axios';
import { Injectable, Inject, BadRequestException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { firstValueFrom } from 'rxjs';
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
    private readonly configService: ConfigService,
    private readonly httpService: HttpService,
  ) {}

  async findAll(): Promise<Product[]> {
    return this.productRepository.find();
  }

  async createProduct(createProductDto: createProductDto): Promise<Product> {
    const baseURL = this.configService.get('SANDBOX');
    const accessToken = await this.paypalService.generateAccessToken();
    const headers = {
      'Content-Type': 'application/json',
      Authorization: `Bearer ${accessToken}`,
    };
    const url = `${baseURL}/v1/catalogs/products`;
    const product = await firstValueFrom(
      this.httpService.post(
        url,
        {
          name: createProductDto.name,
          description: createProductDto.description,
          type: createProductDto.type,
          category: createProductDto.category,
        },
        { headers: headers },
      ),
    );

    createProductDto.product_paypal_id = product.data.id;

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
