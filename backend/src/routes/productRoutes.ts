import express, { Request, Response } from "express";
import { Product } from "../models/Product.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const product = await Product.findById(req.params.id);
        if (!product) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.post("/", async (req: Request, res: Response) => {
    try {
        const { name, description, price, category, stock } = req.body;
        const product = new Product({ name, description, price, category, stock });
        await product.save();
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const updatedProduct = await Product.findByIdAndUpdate(req.params.id, req.body, { new: true });
        if (!updatedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json(updatedProduct);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.delete("/:id", async (req: Request, res: Response) => {
    try {
        const deletedProduct = await Product.findByIdAndDelete(req.params.id);
        if (!deletedProduct) {
            res.status(404).json({ message: "Product not found" });
            return;
        }
        res.json({ message: "Product deleted" });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
