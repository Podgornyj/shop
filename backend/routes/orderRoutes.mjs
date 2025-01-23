import express from "express";
import { Order } from "../models/Order.mjs";
import { Cart } from "../models/Cart.mjs";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.mjs";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const orders = await Order.find().populate("userId items.productId");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get("/my", authMiddleware, async (req, res) => {
    try {
        const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
        res.json(orders);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/", authMiddleware, async (req, res) => {
    try {
        const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
        if (!cart || cart.items.length === 0) {
            return res.status(400).json({ message: "Cart is empty" });
        }

        const totalPrice = cart.items.reduce((sum, item) => sum + item.productId.price * item.quantity, 0);
        const order = new Order({
            userId: req.user.id,
            items: cart.items.map((item) => ({
                productId: item.productId._id,
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

router.put("/:id/status", authMiddleware, adminMiddleware, async (req, res) => {
    try {
        const order = await Order.findById(req.params.id);
        if (!order) return res.status(404).json({ message: "Order not found" });

        order.status = req.body.status;
        await order.save();

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
