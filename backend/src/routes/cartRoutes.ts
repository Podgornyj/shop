import express, { Request, Response } from "express";
import { Cart } from "../models/Cart.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { CustomRequest } from "../middlewares/customRequest.js";

const router = express.Router();

router.get("/", authMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const cart = await Cart.findOne({ userId: req.user.id }).populate("items.productId");
        res.json(cart || { items: [] });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/add", authMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const { productId, quantity } = req.body;
        let cart = await Cart.findOne({ userId: req.user.id });

        if (!cart) {
            cart = new Cart({ userId: req.user.id, items: [] });
        }

        const itemIndex = cart.items.findIndex((item) => item.productId.toString() === productId);
        if (itemIndex > -1) {
            cart.items[itemIndex].quantity += quantity;
        } else {
            cart.items.push({ productId, quantity });
        }

        await cart.save();
        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.delete("/remove/:productId", authMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        let cart = await Cart.findOne({ userId: req.user.id });
        if (!cart) {
            res.status(404).json({ message: "Cart not fount" });
            return;
        }

        cart.items = cart.items.filter((item) => item.productId.toString() !== req.params.productId);
        await cart.save();

        res.json(cart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
