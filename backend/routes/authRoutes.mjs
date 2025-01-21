import express from "express";
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

import { User } from "../models/User.mjs";

const router = express.Router();

router.post('/register', async (req, res) => {
    try {
        const { username, email, password } = req.body;
        const isExistUser = await User.findOne({ email });
        if (isExistUser) {
            return res.status(400).json({ message: `User is existed` });
        }

        const hashedPassword = await bcrypt.hash(password, 10);

        const user = new User({ username, email, password: hashedPassword });
        await user.save();
        res.status(201).json({ message: "Success register" });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.post('/login', async (req, res) => {
    try {
        if (req.cookies.token) {
            return res.status(400).json({ message: `You are loggined` });
        }
        const { email, password } = req.body;
        const user = await User.findOne({ email });

        if (!user) {
            return res.status(400).json({ message: `Incorrect data` });
        }

        const isCorrectPassword = await bcrypt.compare(password, user.password);

        if (!isCorrectPassword) {
            return res.status(400).json({ message: `Incorrect data` });
        }

        const token = jwt.sign({ id: user._id, role: user.role }, process.env.JWT_SECRET, { expiresIn: "1d" });
        res.cookie('token', token, {
            httpOnly: true,
            sameSite: "strict",
            maxAge: 1 * 24 * 60 * 60 * 1000
        });
        res.status(201).json({ message: "Success login", user: { username: user.username, email: user.email } });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

router.get('/logout', async (req, res) => {
    try {
        if (req.cookies.token) {
            res.clearCookie('token');
            return res.status(200).json({ message: 'You are logged out' });
        }
        res.status(400).json({ message: `Bad request` });

    } catch (error) {
        res.status(500).json({ message: "Server Error", error });
    }
});

export default router;