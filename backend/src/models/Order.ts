import mongoose, { Schema, Document } from "mongoose";


interface IOrderItem {
    productId: mongoose.Schema.Types.ObjectId;
    quantity: number;
}

export interface IOrder extends Document {
    userId: mongoose.Schema.Types.ObjectId;
    items: IOrderItem[];
    totalPrice: number;
    status: "pending" | "processing" | "shipped" | "delivered" | "cancelled";
    createdAt: Date;
}

const orderSchema = new mongoose.Schema<IOrder>({
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    items: [
        {
            productId: { type: mongoose.Schema.Types.ObjectId, ref: "Product", required: true },
            quantity: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    status: {
        type: String,
        enum: ["pending", "processing", "shipped", "delivered", "cancelled"],
        default: "pending",
    },
    createdAt: { type: Date, default: Date.now },
});

export const Order = mongoose.model<IOrder>("Order", orderSchema);
