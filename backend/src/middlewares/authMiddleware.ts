import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from 'jsonwebtoken';
import { CustomRequest } from "./customRequest.js";

export const authMiddleware = async (req: CustomRequest, res: Response, next: NextFunction) => {
    const token: string = req.cookies.token;
    if (!token) {
        res.status(401).json({ message: "Access deny" });
        return;
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET || '') as JwtPayload & { id: string; role: string };
        req.user = decodedToken;
    } catch (error) {
        res.status(401).json({ message: "Access deny" });
        return;
    }
    next();
}

export const adminMiddleware = (req: CustomRequest, res: Response, next: NextFunction) => {
    if (req?.user && req.user.role !== "admin") {
        res.status(403).json({ message: "Access deny" });
        return;
    }
    next();
};