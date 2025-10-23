import pool from "../../config/conexion.js";
import bcrypt from "bcryptjs"; // más ligero y estable que bcrypt

// Obtener todos los usuarios
export const obtenerUsuarios = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT ID_Usuario, Nombre, Email FROM usuario"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un usuario por ID
export const obtenerUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT ID_Usuario, Nombre, Email FROM usuario WHERE ID_Usuario = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear usuario
export const crearUsuario = async (req, res) => {
  try {
    const { Nombre, Email, contrasena } = req.body;

    if (!Nombre || !Email || !contrasena) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const [result] = await pool.query(
      "INSERT INTO usuario (Nombre, Email, constraseñaHash) VALUES (?, ?, ?)",
      [Nombre, Email, hash]
    );

    res.status(201).json({ 
      message: "Usuario creado correctamente", 
      id: result.insertId, 
      Nombre, 
      Email 
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar usuario
export const actualizarUsuario = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Email, contrasena } = req.body;

    let hash;
    if (contrasena) {
      hash = await bcrypt.hash(contrasena, 10);
    }

    const [result] = await pool.query(
      "UPDATE usuario SET Nombre = ?, Email = ?, constraseñaHash = ? WHERE ID_Usuario = ?",
      [Nombre, Email, hash, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrar usuario
export const borrarUsuario = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM usuario WHERE ID_Usuario = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    res.json({ message: "Usuario eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login de usuario
export const loginUsuario = async (req, res) => {
  try {
    const { Email, contrasena } = req.body;

    if (!Email || !contrasena) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE Email = ?",
      [Email]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Usuario no encontrado" });
    }

    const usuario = rows[0];

    const match = await bcrypt.compare(contrasena, usuario.constraseñaHash);
    if (!match) {
      return res.status(401).json({ error: "Contraseña incorrecta" });
    }

    res.json({
      message: "Login exitoso",
      usuario: {
        ID_Usuario: usuario.ID_Usuario,
        Nombre: usuario.Nombre,
        Email: usuario.Email
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
