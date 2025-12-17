import jwt from "jsonwebtoken";

const authMiddleware = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader) {
        return res.status(401).json({
            success: false,
            message: "Token não fornecido",
        });
    }

    const authParts = authHeader.split(" ");

    if (authParts.length !== 2) {
        return res.status(401).json({
            success: false,
            message: "Formato de token inválido",
        });
    }

    const [type, token] = authParts;

    if (type !== "Bearer") {
        return res.status(401).json({
        success: false,
        message: "Token mal formatado",
        });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = {
        id: decoded.userId,
        email: decoded.email
    };

    return next();
    } catch (error) {
    return res.status(401).json({
        success: false,
        message: "Token inválido ou expirado",
    });
    }
};

export default authMiddleware;