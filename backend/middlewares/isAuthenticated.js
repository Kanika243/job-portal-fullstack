import jwt from "jsonwebtoken";

const isAuthenticated = async (req, res, next) => {
    try {
        // check cookie first, fall back to Authorization header
        let token = req.cookies.token;
        if (!token && req.headers.authorization) {
            const parts = req.headers.authorization.split(" ");
            if (parts[0] === "Bearer" && parts[1]) {
                token = parts[1];
            }
        }
        if (!token) {
            return res.status(401).json({
                message: "User not authenticated",
                success: false,
            })
        }
        const secret = process.env.JWT_SECRET || process.env.SECRET_KEY;
        if (!secret) {
            return res.status(500).json({ message: "Server misconfiguration: JWT secret missing", success: false });
        }
        const decode = jwt.verify(token, secret);
        if(!decode){
            return res.status(401).json({
                message:"Invalid token",
                success:false
            })
        };
        req.id = decode.userId;
        next();
    } catch (error) {
        // token verification errors should be 401
        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: 'Invalid or expired token', success: false });
        }
        next(error);
    }
}
export default isAuthenticated;