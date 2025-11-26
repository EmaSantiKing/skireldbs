import express from "express";
import cors from "cors";
import path from "path";      // ← AGREGAR ESTO
import { fileURLToPath } from "url";  // ← NECESARIO PARA ESM

import clienteRoutes from "./backend/src/routes/cliente.routes.js";
import prendasRoutes from "./backend/src/routes/prendas.routes.js";
import pedidosRoutes from "./backend/src/routes/pedidos.routes.js";
import itempedidoRoutes from "./backend/src/routes/itempedido.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

// Necesario para usar __dirname en ES Modules:
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());

// 🔥🔥 ESTE MIDDLEWARE ES LO QUE TE FALTABA 🔥🔥
app.use("/uploads", express.static(path.join(__dirname, "backend", "uploads")));

app.use("/cliente", clienteRoutes);
app.use("/prendas", prendasRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/itempedido", itempedidoRoutes);

app.get("/", (req, res) => {
  res.send("Servidor funcionando correctamente");
});

app.use((err, req, res, next) => {
  console.error(err);
  res.status(500).json({ error: "Error conectando con el servidor" });
});

app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
