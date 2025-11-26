// src/routes/pedidos.routes.js
import { Router } from "express";
import {
  obtenerPedidos,
  obtenerPedido,
  crearPedido,
  actualizarPedido,
  borrarPedido,
  obtenerPedidosPorCliente,
  obtenerPedidoDeCliente
} from "../controller/pedidos.controller.js";

const router = Router();

// Rutas
router.get("/", obtenerPedidos);

// Específicas primero
router.get("/cliente/:idCliente", obtenerPedidosPorCliente);
router.get("/cliente/:idCliente/pedido/:idPedido", obtenerPedidoDeCliente);

router.get("/:id", obtenerPedido);
router.post("/", crearPedido);
router.put("/:id", actualizarPedido);
router.delete("/:id", borrarPedido);

export default router;