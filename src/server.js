import express from "express";
import dotenv from "dotenv";

dotenv.config();


const app = express();


app.use(express.json());


const PORT = process.env.PORT || 3000;

app.get("/health ", (req, res) => {
  res.send("API de Encurtador de Links");
});

app.listen(PORT, () => {
  console.log(`Server rodando em http://localhost:${PORT}`);
});
