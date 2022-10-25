import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";
import mongoose from "mongoose";
import { Category } from "src/category/category.schema";

export type ProductDocument = Product & Document

@Schema()
export class Product {

    id: string;

    @Prop({ type: Number, default: 0 })
    code: Number;

    @Prop({ type: String, required: true })
    name: string;

    @Prop({ type: Number, required: true })
    price: Number;

    @Prop({ type: String, required: true })
    image: String;

    @Prop({ type: mongoose.Schema.Types.ObjectId, ref: Category.name })
    category: Category;
}

export const ProductSchema = SchemaFactory.createForClass(Product);