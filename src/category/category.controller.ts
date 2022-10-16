import { Body, Controller, Get, Post } from '@nestjs/common';
import { Category } from './category.schema';
import { CategoryService } from './category.service';

@Controller('category')
export class CategoryController {
    constructor(private categoryService: CategoryService) {}    

    @Post()
    async create(@Body() category: Category): Promise<Category> {
        return this.categoryService.create(category);
    }

    @Get()
    async findAll(): Promise<Category[]> {
        return this.categoryService.findAll();
    }

    @Get('products')
    async findByCategory() {
        return this.categoryService.findCategoriesAndProducts();
    }
}
