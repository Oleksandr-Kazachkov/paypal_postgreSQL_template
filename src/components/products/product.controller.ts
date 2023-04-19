import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import CreateProductDto from './dto/create.product.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductService } from './product.service';
import { FindOptionsOrderValue } from 'typeorm';

@Controller('/products')
export class ProductController {
  constructor(
    private readonly productService: ProductService,
    private readonly productRepository: ProductRepository,
  ) {}

  @Post('/create-product')
  async createProduct(
    @Body() createProductDto: CreateProductDto,
  ): Promise<ProductEntity> {
    return await this.productService.createProduct(createProductDto);
  }

  @Get('/get-all-products')
  async getAllProducts() {
    const foo = await this.productRepository.findAll();

    return foo;
  }

  @Post('/create-random-products')
  async createRandomUser(@Body() amount: number) {
    await this.productRepository.createProducts(amount);
  }

  @Get('/get-all-products-sort')
  async getAllProductsSort() {
    const foo = await this.productRepository.findAllByPrice();

    return foo;
  }

  @Get('/get-all-products-grade')
  async getAllProductsSortGrade(
    @Query('sortBy') sortBy: FindOptionsOrderValue,
  ) {
    const foo = await this.productRepository.findAllByGrade(sortBy);

    return foo;
  }
}
