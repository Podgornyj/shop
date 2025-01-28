import express, { Request, Response } from "express";
import { authMiddleware, adminMiddleware } from "../middlewares/authMiddleware.js";
import { CustomRequest } from "../middlewares/customRequest.js";
import { prisma } from "../prisma.js";

const router = express.Router();

router.get("/", authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const orders = await prisma.order.findMany();
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
        // const orders = await Order.find({ userId: req.user.id }).populate("items.productId");
        const orders = await prisma.order.findMany({
            where: { userId: req.user.id },
        });
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

        if (!cart || cart.items.length === 0) {
            res.status(400).json({ message: "Cart is empty" });
            return;
        }

        const totalPrice = cart.items.reduce((sum, item: any) => sum + item.product.price * item.quantity, 0);

        const order = await prisma.order.create({
            data: {
                userId: req.user.id,
                totalPrice,
                items: {
                    create: cart.items.map((item) => {
                        return {
                            productId: item.productId,
                            quantity: item.quantity,
                        }
                    })
                }
            }
        })

        await prisma.cart.delete({ where: { userId: req.user.id } })

        res.status(201).json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

router.put("/:id/status", authMiddleware, adminMiddleware, async (req: Request, res: Response) => {
    try {
        const order = await prisma.order.update({
            where: { id: req.params.id },
            data: { status: req.body.status }
        });

        res.json(order);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

export default router;
