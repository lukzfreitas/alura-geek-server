import { Body, Controller, Get, Param, Post, Query } from '@nestjs/common';
import { QueryParams } from '../models/query-params.model';
import { Category } from './category.schema';
import { CategoryService } from './category.service';

@Controller()
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post()
  async create(@Body() category: Category): Promise<Category> {
    return this.categoryService.create(category);
  }

  @Get('/category')
  async findAll(): Promise<Category[]> {
    return this.categoryService.findAll();
  }

  @Get('/category/products')
  async findByCategory(@Query() query: any) {
    query = new QueryParams(query);
    return this.categoryService.findCategoriesAndProducts(query);
  }

  @Get('/category/:code')
  async findByCode(@Param('code') code: string): Promise<Category> {
    return this.categoryService.findByCode(Number.parseInt(code));
  }

  @Get('/category/:code/products')
  async findByCodeProducts(@Param('code') code: string) {
    return this.categoryService.findByCodeProducts(Number.parseInt(code));
  }
}
