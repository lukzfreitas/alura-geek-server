import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose from 'mongoose';
import { Category } from 'src/category/category.schema';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  id: string;

  @Prop({ type: Number, default: 0 })
  code: number;

  @Prop({ type: String, required: true })
  name: string;

  @Prop({ type: Number, required: true })
  price: number;

  @Prop({ type: String, required: true })
  image: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
  category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
