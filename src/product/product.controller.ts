import { Post, Body, Controller, Get, Param, Delete } from '@nestjs/common';
import { Product } from './product.schema';
import { ProductService } from './product.service';
import { Public } from 'src/auth/auth.constant';

@Controller()
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post('/products')
  async create(@Body() product: any): Promise<Product> {
    return this.productService.create(product);
  }

  @Public()
  @Post('/products/update/:code')
  async update(
    @Body() product: any,
    @Param('code') code: string,
  ): Promise<Product> {
    return await this.productService.update(code, product);
  }

  @Public()
  @Post('/products/delete/:code')
  async delete(@Param('code') code: number): Promise<void> {
    return this.productService.delete(code);
  }

  @Public()
  @Get('/products')
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get('/products/:code')
  async findByCode(@Param('code') code: number): Promise<Product> {
    return this.productService.findOne(code);
  }
}
