import { Body, Controller, Get, Param, Post } from '@nestjs/common';
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
  async findByCategory() {
    return this.categoryService.findCategoriesAndProducts();
  }

  @Get('/category/:code')
  async findByCode(@Param('code') code: string): Promise<Category> {
    return this.categoryService.findByCode(Number.parseInt(code));
  }

  @Get(':code/products')
  async findByCodeProducts(@Param('code') code: string) {
    return this.categoryService.findByCodeProducts(Number.parseInt(code));
  }
}
