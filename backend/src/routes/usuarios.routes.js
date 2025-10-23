import { Router } from "express";
import {
  obtenerUsuarios,
  obtenerUsuario,
  crearUsuario,
  actualizarUsuario,
  borrarUsuario,
  loginUsuario
} from "../controller/usuarios.controller.js";

const router = Router();

router.get("/", obtenerUsuarios);          // Todos los usuarios
router.get("/:id", obtenerUsuario);        // Usuario por ID
router.post("/", crearUsuario);            // Crear usuario
router.put("/:id", actualizarUsuario);     // Actualizar usuario
router.delete("/:id", borrarUsuario);      // Borrar usuario
router.post("/login", loginUsuario);       // Login de usuario

export default router;
