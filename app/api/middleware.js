import jwt from "jsonwebtoken"

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret_key"

export function verifyToken(req, res, next) {
    const token = req.headers.authorization?.split(" ")[1]
    if (!token) {
        return res.status(401).json({ message: "Access denied. No token provided." })
    }

    try {
        const decoded = jwt.verify(token, JWT_SECRET)
        req.user = decoded
        next()
    } catch (error) {
        res.status(400).json({ message: "Invalid token." })
    }
}
