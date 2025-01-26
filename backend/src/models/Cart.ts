import mongoose, { Schema, Document } from "mongoose";

interface ICartItem {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface ICart extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    items: ICartItem[];
}

const cartSchema = new mongoose.Schema<ICart>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true, default: 1 },
        },
    ],
});

export const Cart = mongoose.model<ICart>("Cart", cartSchema);
