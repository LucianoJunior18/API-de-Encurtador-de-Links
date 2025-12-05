import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/auth.routes.js";
import linkRoutes from "./routes/link.routes.js";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

// ROTA DE TESTE
app.get("/health", (req, res) => {
    res.status(200).send("API is healthy");
});


//  Rotas da API
app.use("/auth", authRoutes);
app.use("/links", linkRoutes);

export default app;