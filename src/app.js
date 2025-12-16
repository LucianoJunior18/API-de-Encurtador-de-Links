    import express from "express";
    import cors from "cors";
    import dotenv from "dotenv";
    import authRoutes from "./routes/authRoutes.js";
    import linkRoutes from "./routes/linkRoutes.js";


    dotenv.config();

    const app = express();

    app.use(cors());

    app.use(express.json());

    // ROTA DE TESTE
    app.get("/health", (req, res) => {
        res.status(200).send("API funcionando corretamente!");
    });


    //  Rotas da API
    app.use("/auth", authRoutes);
    app.use("/links", linkRoutes);

    export default app;