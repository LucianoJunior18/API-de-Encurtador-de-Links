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
 *     description: >
 *       Este endpoint realiza redirecionamento HTTP (301).
 *       ⚠️ Copie a URL abaixo e cole diretamente no navegador.
 *     tags: [Redirect]
 *     parameters:
 *       - in: path
 *         name: shortCode
 *         required: true
 *         schema:
 *           type: string
 *           example: JsyDbJ
 *     responses:
 *       301:
 *         description: Redireciona para a URL original
 *         headers:
 *           Location:
 *             description: URL de destino
 *             schema:
 *               type: string
 *               example: https://www.google.com
 *       404:
 *         description: Link não encontrado
 */
router.get("/:shortCode", (req, res) =>
  LinkController.redirect(req, res)
);

export default router;
