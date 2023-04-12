import { Body, Controller, Get, Post } from '@nestjs/common';
import { ProductRepository } from './product.repository';
import CreateProductDto from './dto/create.product.dto';
import { ProductEntity } from './entity/product.entity';
import { ProductService } from './product.service';

@Controller()
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
}
