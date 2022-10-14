import { Prop, Schema, SchemaFactory } from "@nestjs/mongoose";

export type CategoryDocument = Category & Document

@Schema()
export class Category {
    
    @Prop({type: Number, required: true, unique: true})
    code: Number;
    
    @Prop({type: String, required: true})
    name: string;   
    
}

export const CategorySchema = SchemaFactory.createForClass(Category);