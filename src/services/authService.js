import prisma from "../config/prismaClient.js";
import { generateToken } from "../config/jwt.js";
import bcrypt from "bcrypt";

export const authService = {
  async register(userData) {
    const { name, email, password } = userData;

    // Verificar se já existe usuário com aquele email
    const existingUser = await prisma.user.findUnique({
      where: { email },
    });

    if (existingUser) {
      throw new Error("Email já cadastrado");
    }

    // Hash da senha
    const hashedPassword = await bcrypt.hash(password, 10);

    // Criar usuário no banco
    const user = await prisma.user.create({
      data: {
        name,
        email,
        password: hashedPassword,
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
      throw new Error("Credenciais inválidas");
    }

    // Validar senha
    const isPasswordValid = await bcrypt.compare(password, user.password);

    if (!isPasswordValid) {
      throw new Error("Credenciais inválidas");
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
};

export default authService;
