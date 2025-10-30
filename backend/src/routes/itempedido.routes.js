import { Router } from "express";
import {
  crearItemPedido,
  obtenerItemsPorPedido
} from "../controller/itempedido.controller.js";

const router = Router();

router.post("/", crearItemPedido);             // Crear un item de pedido
router.get("/pedido/:id", obtenerItemsPorPedido); // Obtener items de un pedido

export default router;
