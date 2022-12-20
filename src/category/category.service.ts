import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Category, CategoryDocument } from './category.schema';

@Injectable()
export class CategoryService {
  @InjectModel(Category.name) private categoryModel: Model<CategoryDocument>;

  async create(category: Category): Promise<Category> {
    return new this.categoryModel(category).save();
  }

  async findAll(): Promise<Category[]> {
    return this.categoryModel.find().exec();
  }

  async findByCode(code: number) {
    return this.categoryModel.findOne({ code }).exec();
  }

  async findByCodeProducts(code: number) {
    return this.categoryModel
      .aggregate([
        {
          $match: { code },
        },
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'category',
            as: 'products',
          },
        },
      ])
      .exec();
  }

  async findCategoriesAndProducts(query: any) {
    return this.categoryModel
      .aggregate([
        {
          $lookup: {
            from: 'products',
            localField: '_id',
            foreignField: 'category',
            as: 'products',
            pipeline: [{ $limit: Number.parseInt(query?.limit || 0) }],
          },
        },
      ])
      .exec();
  }
}
