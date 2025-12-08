import { Router } from "express";

const router = Router();

// temporário só pra testar:
router.get("/", (req, res) => {
  res.json({ message: "Auth OK" });
});

export default router;
