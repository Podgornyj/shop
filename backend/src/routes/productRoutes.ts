import express, { Request, Response } from "express";

import { prisma } from "../prisma.js";

const router = express.Router();

router.get("/", async (req: Request, res: Response) => {
    try {
        const products = await prisma.product.findMany()
        res.json(products);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.get("/:id", async (req: Request, res: Response) => {
    try {
        const product = await prisma.product.findUnique({
            where: {
                id: req.params.id
            }
        })
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
        const {
            name,
            description,
            price,
            category,
            stock,
            discount,
            image,
            newcollection,
            hit,
            discountpercentage
        } = req.body;
        const product = await prisma.product.create({
            data: {
                discount,
                image,
                newcollection,
                hit,
                discountpercentage,
                name,
                description,
                price,
                category,
                stock
            }
        })
        res.status(201).json(product);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.put("/:id", async (req: Request, res: Response) => {
    try {
        const updatedProduct = await prisma.product.update({
            where: {
                id: req.params.id
            },
            data: req.body
        });

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
        const deletedProduct = await prisma.product.delete({
            where: { id: req.params.id }
        });
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
