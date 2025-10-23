import { Router } from "express";
import {
  obtenerPrendas,
  obtenerPrenda,
  crearPrenda,
  actualizarPrenda,
  borrarPrenda
} from "../controller/prendas.controller.js";

const router = Router();

router.get("/", obtenerPrendas);          // Todas las prendas
router.get("/:id", obtenerPrenda);        // Una prenda por ID
router.post("/", crearPrenda);            // Crear prenda
router.put("/:id", actualizarPrenda);     // Actualizar prenda
router.delete("/:id", borrarPrenda);      // Borrar prenda

export default router;
