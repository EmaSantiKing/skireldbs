import express from "express";
import cors from "cors";
import usuariosRoutes from "./backend/src/routes/usuarios.routes.js";
import prendasRoutes from "./backend/src/routes/prendas.routes.js";
import pedidosRoutes from "./backend/src/routes/pedidos.routes.js";
import backupRoutes from "./backend/src/routes/backup.routes.js";

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/usuarios", usuariosRoutes);
app.use("/prendas", prendasRoutes);
app.use("/pedidos", pedidosRoutes);
app.use("/backup", backupRoutes);

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
