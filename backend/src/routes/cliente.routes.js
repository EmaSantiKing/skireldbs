import { Router } from "express";
import { obtenerClientes, obtenerCliente, crearCliente, actualizarCliente, borrarCliente, loginCliente } from "../controller/cliente.controller.js";

const router = Router();

router.get("/", obtenerClientes); //Obtener Todos los Clientes
router.get("/:id", obtenerCliente); //Obtener un Cliente especifico por ID
router.post("/", crearCliente); //Crear un nuevo cliente en la BD
router.put("/:id", actualizarCliente); //Actualizar datos de un cliente ya existente en la BD
router.delete("/:id", borrarCliente); //Borrar un cliente de la BD
router.post("/login", loginCliente); //Login

export default router;
