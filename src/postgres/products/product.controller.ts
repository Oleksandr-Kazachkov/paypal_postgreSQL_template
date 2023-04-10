import { Body, Controller, Get, Post } from '@nestjs/common';
import CreateProductDto from './dto/create.product.dto';
import { ProductService } from './product.service';

@Controller()
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  @Post('/createProduct')
  async createOrder(@Body() createProductDto: CreateProductDto) {
    return await this.productService.createProduct(createProductDto);
  }

  @Get('/getAllProducts')
  async getAllProducts() {
    const foo = await this.productService.findAll();

    return foo;
  }
}
