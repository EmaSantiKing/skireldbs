import { Router } from "express";
import {
  crearItemPedido,
  obtenerItemsPedido
} from "../controller/itempedido.controller.js";

const router = Router();

router.post("/", crearItemPedido);             // Crear un item de pedido
router.get("/pedido/:id", obtenerItemsPedido); // Obtener items de un pedido

export default router;
