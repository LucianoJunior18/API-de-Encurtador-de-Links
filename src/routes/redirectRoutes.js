import { Router } from "express";
import LinkController from "../controllers/linkController.js";

const router = Router();

/**
 * @swagger
 * tags:
 *   name: Redirect
 *   description: Redirecionamento de links encurtados
 */

/**
 * @swagger
 * /{shortCode}:
 *   get:
 *     summary: Redirecionar para URL original
 *     tags: [Redirect]
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       301:
 *         description: Redireciona para a URL original
 *       404:
 *         description: Link não encontrado
 */
router.get("/:shortCode", (req, res) =>
  LinkController.redirect(req, res)
);

export default router;
