import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoryService {
    @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>

    async create(category: Category): Promise<Category> {
        return new this.categoryModel(category).save();
    }

    async findAll(): Promise<Category[]> {
        return this.categoryModel.find().exec();
    }
}
