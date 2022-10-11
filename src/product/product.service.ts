import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
    @InjectModel(Product.name) private productModel: Model<ProductDocument>

    async create(product: Product): Promise<Product> {
        return new this.productModel(product).save();
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().exec();
    }

    async findOne(code: string): Promise<Product> {
        return this.productModel.findOne({ code }).exec();
    }
}