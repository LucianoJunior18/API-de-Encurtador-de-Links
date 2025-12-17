import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`🚀 Server rodando na porta: ${PORT}`);
  console.log(`📄 Swagger disponível em: /api-docs`);
});
