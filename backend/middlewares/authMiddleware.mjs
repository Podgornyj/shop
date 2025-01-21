import jwt from 'jsonwebtoken';

export const authMiddleware = async (req, res, next) => {
    const token = req.cookies.token;
    if (!token) {
        return res.status(401).json({ message: "Access deny" });
    }
    try {
        const decodedToken = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decodedToken;
    } catch (error) {
        return res.status(401).json({ message: "Access deny" });
    }
    next();
}