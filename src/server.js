import express from "express";
import app from "./app.js";
import dotenv from "dotenv";
import router from "./routes/authRoutes.js";
dotenv.config();


app.use(router);
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server rodando na porta ${PORT}`);
});
