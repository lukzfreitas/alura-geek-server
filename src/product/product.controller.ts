import { Post, Body, Controller, Get, Param } from '@nestjs/common';
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
  @Post('/products/update/:id')
  async update(
    @Body() product: any,
    @Param('id') id: string,
  ): Promise<Product> {
    return await this.productService.update(id, product);
  }

  @Public()
  @Post('/products/delete/:id')
  async delete(@Param('id') id: string): Promise<void> {
    return this.productService.delete(id);
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
