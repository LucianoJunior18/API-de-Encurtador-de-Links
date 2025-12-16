import { Router } from "express";
import LinkController from "../controllers/linkController.js";

const router = Router();

// rota pública de redirecionamento
router.get("/:shortCode", (req, res) => LinkController.redirect(req, res));

export default router;
