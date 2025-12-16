// src/routes/authRoutes.js
import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { registerSchema, loginSchema } from '../validations/authSchemas.js';

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Auth
 *   description: Rotas de autenticação de usuários
 */

/**
 * @swagger
 * /auth/register:
 *   post:
 *     summary: Cadastro de um novo usuário
 *     description: Cria um novo usuário no sistema
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - name
 *               - email
 *               - password
 *             properties:
 *               name:
 *                 type: string
 *                 example: Lucas Ribeiro
 *               email:
 *                 type: string
 *                 example: lucas@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       201:
 *         description: Usuário cadastrado com sucesso
 *       400:
 *         description: Dados inválidos
 *       409:
 *         description: Usuário já existente
 */
router.post(
  '/auth/register',
  validateSchema(registerSchema),
  (req, res) => AuthController.register(req, res)
);

/**
 * @swagger
 * /auth/login:
 *   post:
 *     summary: Login do usuário
 *     description: Autentica o usuário e retorna um token JWT
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *                 example: lucas@email.com
 *               password:
 *                 type: string
 *                 example: 123456
 *     responses:
 *       200:
 *         description: Login realizado com sucesso
 *       401:
 *         description: Credenciais inválidas
 */
router.post(
  '/auth/login',
  validateSchema(loginSchema),
  (req, res) => AuthController.login(req, res)
);

export default router;
