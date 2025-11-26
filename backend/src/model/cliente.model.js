import pool from "../../config/conexion.js";

export const ClienteModel = {
  obtenerTodos: async () => {
    const [rows] = await pool.query(
      "SELECT ID_Cliente, Nombre, Apellido, Email, contorno_pecho, contorno_cintura, contorno_cadera FROM cliente"
    );
    return rows;
  },

  obtenerPorId: async (id) => {
    const [rows] = await pool.query(
      "SELECT ID_Cliente, Nombre, Apellido, Email, contorno_pecho, contorno_cintura, contorno_cadera FROM cliente WHERE ID_Cliente = ?",
      [id]
    );
    return rows[0];
  },

  crear: async (nombre, apellido, email, hash, pecho = 0, cintura = 0, cadera = 0) => {
    const [result] = await pool.query(
      "INSERT INTO cliente (Nombre, Apellido, Email, PasswordHash, contorno_pecho, contorno_cintura, contorno_cadera) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [nombre, apellido, email, hash, pecho, cintura, cadera]
    );
    return result.insertId;
  },

  actualizar: async (id, nombre, apellido, email, hash, pecho = 0, cintura = 0, cadera = 0) => {
    const [result] = await pool.query(
      "UPDATE cliente SET Nombre=?, Apellido=?, Email=?, PasswordHash=?, contorno_pecho=?, contorno_cintura=?, contorno_cadera=? WHERE ID_Cliente=?",
      [nombre, apellido, email, hash, pecho, cintura, cadera, id]
    );
    return result.affectedRows > 0;
  },

  borrar: async (id) => {
    const [result] = await pool.query(
      "DELETE FROM cliente WHERE ID_Cliente=?",
      [id]
    );
    return result.affectedRows > 0;
  },

  obtenerPorEmail: async (email) => {
    const [rows] = await pool.query(
      "SELECT * FROM cliente WHERE Email=?",
      [email]
    );
    return rows[0];
  },
};
