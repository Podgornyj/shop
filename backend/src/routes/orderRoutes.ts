import express, { Request, Response } from "express";
import { Order } from "../models/Order.js";
import { Cart } from "../models/Cart.js";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";
import { CustomRequest } from "../middlewares/customRequest.js";
import { IProduct } from "../models/Product.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const orders = await Order.find().populate("userId items.productId");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get("/my", authMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/", authMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const cart = await Cart.findOne({ userId: req.user.id }).populate<{ items: { productId: IProduct }[] }>("items.productId");
        if (!cart || cart.items.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
            return;
        }
        //todo
        //item.quantity
        const totalPrice = cart.items.reduce((sum, item: any) => sum + item.productId.price * item.quantity, 0);
        const order = new Order({
            userId: req.user.id,
            items: cart.items.map((item: any) => ({
                productId: item.productId,
                quantity: item.quantity,
            })),
            totalPrice,
        });

        await order.save();
        await Cart.deleteOne({ userId: req.user.id });

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.put("/:id/status", authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) {
            res.status(404).json({ message: "Order not found" });
            return;
        }

        order.status = req.body.status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
