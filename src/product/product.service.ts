import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Product, ProductDocument } from './product.schema';

@Injectable()
export class ProductService {
    @InjectModel(Product.name) private productModel: Model<ProductDocument>

    async create(product: Product): Promise<Product> {
        const newProduct: Product = await new this.productModel(product).save();
        const count: number = await this.productModel.count();
        const prodcutUpdate = await this.productModel.findByIdAndUpdate({ _id: newProduct.id }, { code: count });
        return prodcutUpdate;
    }

    async findAll(): Promise<Product[]> {
        return this.productModel.find().populate("category").exec();
    }

    async findOne(code: Number): Promise<Product> {
        return this.productModel.findOne({ code }).exec();
    }

    async delete(code: Number): Promise<void> {
        this.productModel.findOneAndDelete({ code }).exec();
    }
}
