import express, { Request, Response } from "express";
import { authMiddleware } from "../middlewares/authMiddleware.js";
import { CustomRequest } from "../middlewares/customRequest.js";
import { prisma } from "../prisma.js";

const router = express.Router();

router.get("/", authMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        })
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
        let cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: true
            }
        });

        if (!cart) {
            cart = await prisma.cart.create({
                data: {
                    userId: req.user.id,
                    items: {
                        create: [{ productId, quantity }]
                    }
                },
                include: { items: true }
            })
            res.json(cart);
            return
        }

        const existingItem = cart.items.find((item) => item.productId === productId);
        if (existingItem) {
            await prisma.cartItem.update({
                where: { id: existingItem.id },
                data: { quantity: existingItem.quantity + quantity }
            })
        } else {
            await prisma.cartItem.create({
                data: {
                    cartId: cart.id,
                    quantity,
                    productId

                }
            });
        }

        const updatedCart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: {
                            select: {
                                name: true
                            }
                        }
                    }
                }
            }
        });

        res.json(updatedCart);
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
        let cart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: true
            }
        });
        if (!cart) {
            res.status(404).json({ message: "Cart not fount" });
            return;
        }

        const existProduct = cart.items.find((item) => item.productId === req.params.productId);
        if (!existProduct) {
            res.status(404).json({ message: `Product (${req.params.productId}) not fount` });
            return
        } else {
            await prisma.cartItem.delete({
                where: { id: existProduct.id }
            })
        }

        let updatedCart = await prisma.cart.findUnique({
            where: { userId: req.user.id },
            include: {
                items: {
                    include: {
                        product: true
                    }
                }
            }
        });

        res.json(updatedCart);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
