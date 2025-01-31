import express, { Request, Response, Router } from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { prisma } from "../prisma.js";

import { authMiddleware } from "../middlewares/authMiddleware.js";
import { CustomRequest } from "../middlewares/customRequest.js";

const router: Router = express.Router();

router.post('/register', async (req: Request, res: Response) => {
    try {
        const { username, email, password } = req.body;
        const isExistUser = await prisma.user.findUnique({
            where: {
                email
            }
        });
        if (isExistUser) {
            res.status(400).json({ message: `User is existed` });
            return;
        }

        const hashedPassword: string = await bcrypt.hash(password, 10);

        const user = await prisma.user.create({
            data: {
                username,
                email,
                password: hashedPassword
            }
        });

        res.status(200).json({ message: "Success register" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.post('/login', async (req: Request, res: Response) => {
    try {
        if (req.cookies.token) {
            res.status(400).json({ message: `You are loggined` });
            return;
        }
        const { email, password } = req.body;
        const user = await prisma.user.findUnique({
            where: {
                email
            }
        })

        if (!user) {
            res.status(400).json({ message: `Incorrect data` });
            return;
        }

        const isCorrectPassword: boolean = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            res.status(400).json({ message: `Incorrect data` });
            return;
        }

        if (!process.env.JWT_SECRET) {
            throw new Error("JWT_SECRET is not defined in environment variables");
        }

        const token: string = jwt.sign({ id: user.id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: 'none',
            secure: true,
            path: '/',
            maxAge: 1 * 24 * 60 * 60 * 1000
        });
        res.status(200).json({ message: "Success login", user: { username: user.username, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.get('/me', authMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });

        if (!user) {
            res.status(400).json({ message: `Incorrect data` });
            return;
        }

        res.status(200).json({ username: user.username, email: user.email });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.get('/logout', authMiddleware, async (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.status(200).json({ message: 'You are logged out' });
        return;

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.post('/change-password', authMiddleware, async (req: CustomRequest, res: Response) => {
    try {
        const { oldPassword, newPassword } = req.body;
        if (!req.user) {
            res.status(401).json({ message: "Unauthorized" });
            return;
        }
        const user = await prisma.user.findUnique({
            where: {
                id: req.user.id
            }
        });
        if (!user) {
            res.status(404).json({ message: "User not found" });
            return;
        }
        const isCorrectPassword = await bcrypt.compare(oldPassword, user.password);

        if (!isCorrectPassword) {
            res.status(400).json({ message: `Incorrect data` });
            return;
        }

        const password = await bcrypt.hash(newPassword, 10);

        await prisma.user.update({
            where: { id: req.user.id },
            data: { password }
        })
        res.status(200).json({ message: "Password was changed" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;