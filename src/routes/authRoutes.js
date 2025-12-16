// src/routes/authRoutes.js
import { Router } from 'express';
import AuthController from '../controllers/authController.js';
import { validateSchema } from '../middlewares/validateSchema.js';
import { registerSchema, loginSchema } from '../validations/authSchemas.js';

const router = Router();

router.post(
  '/auth/register',
  validateSchema(registerSchema),
  (req, res) => AuthController.register(req, res)
);

router.post(
  '/auth/login',
  validateSchema(loginSchema),
  (req, res) => AuthController.login(req, res)
);

export default router;