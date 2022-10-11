import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type ProductDocument = Product & Document

@Schema()
export class Product {
    
    @Prop({type: Number, required: true, unique: true})
    code: Number;
    
    @Prop({type: String, required: true})
    name: string;
    
    @Prop({type: Number, required: true})
    price: Number;
    
    @Prop({type: String, required: true})
    image: String;    
}

export const ProductSchema = SchemaFactory.createForClass(Product);