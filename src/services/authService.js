import prisma from "../config/prisma.js";
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcryptjs";

export const authService = {
  async register(userData) {
    const { name, email, password, age } = userData;

    // Verificar se já existe usuário com aquele email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email already exists");
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
        age,
      },
    });

    // Gerar token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  },

  async login(credentials) {
    const { email, password } = credentials;

    // Buscar usuário por email
    const user = await prisma.user.findUnique({
      where: { email },
    });

    if (!user) {
      throw new Error("Invalid credentials");
    }

    // Verificar se usuário está ativo
    if (!user.isActive) {
      throw new Error("User account is inactive");
    }

    // Validar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Invalid credentials");
    }

    // Gerar token JWT
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  },

  async refreshToken(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user || !user.isActive) {
      throw new Error("User not found or inactive");
    }

    // Gerar novo token
    const token = generateToken({
      userId: user.id,
      email: user.email,
    });

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user;

    return {
      user: userWithoutPassword,
      token,
    };
  },

  async getProfile(userId) {
    const user = await prisma.user.findUnique({
      where: { id: userId },
      include: {
        posts: {
          orderBy: { createdAt: "desc" },
        },
      },
    });

    if (!user) {
      throw new Error("User not found");
    }

    // Remover senha da resposta
    const { password: _, ...userWithoutPassword } = user;

    return userWithoutPassword;
  },
};