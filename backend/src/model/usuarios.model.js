import pool from "../../config/conexion.js";

export const UsuarioModel = {
  obtenerTodos: async () => {
    const [rows] = await pool.query(
      "SELECT ID_Usuario, Nombre, Email, contorno_pecho, contorno_cintura, contorno_cadera FROM usuario"
    );
    return rows;
  },

  obtenerPorId: async (id) => {
    const [rows] = await pool.query(
      "SELECT ID_Usuario, Nombre, Email, contorno_pecho, contorno_cintura, contorno_cadera FROM usuario WHERE ID_Usuario = ?",
      [id]
    );
    return rows[0];
  },

  crear: async (nombre, email, hash, pecho, cintura, cadera) => {
    const [result] = await pool.query(
      "INSERT INTO usuario (Nombre, Email, constraseñaHash, contorno_pecho, contorno_cintura, contorno_cadera) VALUES (?, ?, ?, ?, ?, ?)",
      [nombre, email, hash, pecho, cintura, cadera]
    );
    return result.insertId;
  },

  actualizar: async (id, nombre, email, hash, pecho, cintura, cadera) => {
    const [result] = await pool.query(
      "UPDATE usuario SET Nombre=?, Email=?, constraseñaHash=?, contorno_pecho=?, contorno_cintura=?, contorno_cadera=? WHERE ID_Usuario=?",
      [nombre, email, hash, pecho, cintura, cadera, id]
    );
    return result.affectedRows > 0;
  },

  borrar: async (id) => {
    const [result] = await pool.query(
      "DELETE FROM usuario WHERE ID_Usuario=?",
      [id]
    );
    return result.affectedRows > 0;
  },

  obtenerPorEmail: async (email) => {
    const [rows] = await pool.query(
      "SELECT * FROM usuario WHERE Email=?",
      [email]
    );
    return rows[0];
  },
};
