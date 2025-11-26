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

crear: async (nombre, descripcion, precioBase, opcionTela, opcionesColor, imagen) => {
  const [result] = await pool.query(
    "INSERT INTO prenda (Nombre, Descripcion, precioBase, opcionTela, opcionesColor, imagen) VALUES (?, ?, ?, ?, ?, ?)",
    [nombre, descripcion, precioBase, opcionTela, opcionesColor, imagen]
  );
  return result.insertId;
},


 actualizar: async (id, nombre, descripcion, precioBase, opcionTela, opcionesColor, imagen) => {
  const [result] = await pool.query(
    "UPDATE prenda SET Nombre=?, Descripcion=?, precioBase=?, opcionTela=?, opcionesColor=?, imagen=? WHERE ID_Prenda=?",
    [nombre, descripcion, precioBase, opcionTela, opcionesColor, imagen, id]
  );
  return result.affectedRows;
},


  borrar: async (id) => {
    const [result] = await pool.query(
      "DELETE FROM prenda WHERE ID_Prenda=?",
      [id]
    );
    return result.affectedRows > 0;
  },
};
