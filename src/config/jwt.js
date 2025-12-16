// utils/jwt.js
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET;
const JWT_EXPIRES_IN = process.env.JWT_EXPIRES_IN || "7d";

if (!JWT_SECRET) {
  throw new Error("JWT_SECRET não definido nas variáveis de ambiente");
}

export const jwtConfig = {
  secret: JWT_SECRET,
  expiresIn: JWT_EXPIRES_IN,
};

export const generateToken = (payload = {}) => {
  if (typeof payload !== "object" || Array.isArray(payload)) {
    throw new Error("Payload do token deve ser um objeto");
  }

  return jwt.sign(payload, jwtConfig.secret, {
    expiresIn: jwtConfig.expiresIn,
    algorithm: "HS256",
  });
};

export const verifyToken = (token) => {
  if (!token || typeof token !== "string") {
    throw new Error("Token não informado ou inválido");
  }

  try {
    return jwt.verify(token, jwtConfig.secret, {
      algorithms: ["HS256"],
    });
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      throw new Error("Token expirado");
    }

    throw new Error("Token inválido");
  }
};