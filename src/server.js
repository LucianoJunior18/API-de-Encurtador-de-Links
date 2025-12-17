import dotenv from "dotenv";
import app from "./app.js";

dotenv.config();

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`🚀 Server rodando em: http://localhost:${PORT}`);
  console.log(`📄 Swagger disponível em: http://localhost:${PORT}/api-docs`);

});