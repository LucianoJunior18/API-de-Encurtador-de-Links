import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import linkRoutes from "./routes/linkRoutes.js";
import redirectRoutes from "./routes/redirectRoutes.js";
import swaggerSpec from "./config/swagger.js";
import swaggerUi from "swagger-ui-express";

dotenv.config();

const app = express();

app.use(cors());

app.use(express.json());

app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// ROTA DE TESTE
app.get("/health", (req, res) => {
  res.status(200).send("API funcionando corretamente!");
});

//  Rotas da API
app.use("/auth", authRoutes);
app.use("/links", linkRoutes);
app.use("/", redirectRoutes);

export default app;
