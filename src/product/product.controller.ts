import { Post, Body, Controller, Get, Param } from '@nestjs/common';
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
    findAll(): Promise<Product[]> {
        return this.productService.findAll();
    }

    @Get(':code')
    findByCode(@Param('code') code: string): Promise<Product> {
        return this.productService.findOne(code);
    }
}
