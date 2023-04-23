import {
  Post,
  Body,
  Controller,
  Get,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { Product } from './product.schema';
import { ProductService } from './product.service';
import { Public } from 'src/auth/auth.constant';

@Controller('products')
export class ProductController {
  constructor(private productService: ProductService) {}

  @Post()
  async create(@Body() product: any): Promise<Product> {
    return this.productService.create(product);
  }

  @Public()
  @Post('update')
  async update(@Body() product: any): Promise<Product> {
    return this.productService.update(product);
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
