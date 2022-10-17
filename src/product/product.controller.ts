import { Post, Body, Controller, Get, Param, Delete } from '@nestjs/common';
import { Product } from './product.schema';
import { ProductService } from './product.service';

@Controller('product')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(@Body() product: Product): Promise<Product> {
    return this.productService.create(product);
  }

  @Get()
  async findAll(): Promise<Product[]> {
    return this.productService.findAll();
  }

  @Get(':code')
  async findByCode(@Param('code') code: number): Promise<Product> {
    return this.productService.findOne(code);
  }

  @Delete(':code')
  async delete(@Param('code') code: number): Promise<void> {
    return this.productService.delete(code);
  }
}
