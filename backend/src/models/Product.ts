import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
    name: string,
    description: string,
    price: number,
    category: string,
    stock: number,
    createdAt: Date,
}


const productSchema = new mongoose.Schema<IProduct>({
    name: { type: String, required: true },
    description: { type: String },
    price: { type: Number, required: true },
    category: { type: String },
    stock: { type: Number, required: true, default: 0 },
    createdAt: { type: Date, default: Date.now },
});

export const Product = mongoose.model<IProduct>("Product", productSchema);
