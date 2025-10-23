import { Router } from "express";
import {
  obtenerPedidos,
  obtenerPedido,
  crearPedido,
  actualizarPedido,
  borrarPedido
} from "../controller/pedidos.controller.js";

const router = Router();

router.get("/", obtenerPedidos);        // Todos los pedidos
router.get("/:id", obtenerPedido);      // Pedido por ID
router.post("/", crearPedido);          // Crear pedido
router.put("/:id", actualizarPedido);   // Actualizar pedido
router.delete("/:id", borrarPedido);    // Borrar pedido

export default router;
