import { Router } from "express";
import multerUpload from "../../config/multer.js";
import { crearPrenda, obtenerPrendas, obtenerPrenda, actualizarPrenda, eliminarPrenda } from "../controller/prendas.controller.js";

const router = Router();

router.get("/", obtenerPrendas);
router.get("/:id", obtenerPrenda);

router.post("/", multerUpload.single("imagen"), crearPrenda);
router.put("/:id", multerUpload.single("imagen"), actualizarPrenda);

router.delete("/:id", eliminarPrenda);

export default router;
