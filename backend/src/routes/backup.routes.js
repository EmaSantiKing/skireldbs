import { Router } from "express";
import { realizarBackup } from "../controller/backup.controller.js";

const router = Router();

router.post("/crear", realizarBackup);       // Crea un nuevo backup manual

export default router;
