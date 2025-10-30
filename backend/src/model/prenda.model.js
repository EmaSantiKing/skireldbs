import pool from "../../config/conexion.js";

export const PrendaModel = {
  obtenerTodas: async () => {
    const [rows] = await pool.query("SELECT * FROM prenda");
    return rows;
  },

  obtenerPorId: async (id) => {
    const [rows] = await pool.query(
      "SELECT * FROM prenda WHERE ID_Prenda = ?",
      [id]
    );
    return rows[0];
  },

  crear: async (nombre, descripcion, precioBase, opcionTela, opcionesColor) => {
    const [result] = await pool.query(
      "INSERT INTO prenda (Nombre, Descripcion, precioBase, opcionTela, opcionesColor) VALUES (?, ?, ?, ?, ?)",
      [nombre, descripcion, precioBase, opcionTela, opcionesColor]
    );
    return result.insertId;
  },

  actualizar: async (id, nombre, descripcion, precioBase, opcionTela, opcionesColor) => {
    const [result] = await pool.query(
      "UPDATE prenda SET Nombre=?, Descripcion=?, precioBase=?, opcionTela=?, opcionesColor=? WHERE ID_Prenda=?",
      [nombre, descripcion, precioBase, opcionTela, opcionesColor, id]
    );
    return result.affectedRows > 0;
  },

  borrar: async (id) => {
    const [result] = await pool.query(
      "DELETE FROM prenda WHERE ID_Prenda=?",
      [id]
    );
    return result.affectedRows > 0;
  },
};
