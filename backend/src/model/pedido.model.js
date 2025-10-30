import pool from "../../config/conexion.js";

export const PedidoModel = {
  obtenerTodos: async () => {
    const [rows] = await pool.query(
      `SELECT p.*, u.Nombre AS UsuarioNombre, u.Email AS UsuarioEmail
       FROM pedido p
       JOIN usuario u ON p.ID_Usuario = u.ID_Usuario`
    );
    return rows;
  },

  obtenerPorId: async (id) => {
    const [rows] = await pool.query(
      `SELECT p.*, u.Nombre AS UsuarioNombre, u.Email AS UsuarioEmail
       FROM pedido p
       JOIN usuario u ON p.ID_Usuario = u.ID_Usuario
       WHERE p.ID_Pedido = ?`,
      [id]
    );
    return rows[0];
  },

  crear: async (fecha, estado, precioFinal, id_usuario) => {
    const [result] = await pool.query(
      "INSERT INTO pedido (Fecha, Estado, PrecioFinal, ID_Usuario) VALUES (?, ?, ?, ?)",
      [fecha, estado, precioFinal, id_usuario]
    );
    return result.insertId;
  },

  actualizar: async (id, fecha, estado, precioFinal) => {
    const [result] = await pool.query(
      "UPDATE pedido SET Fecha=?, Estado=?, PrecioFinal=? WHERE ID_Pedido=?",
      [fecha, estado, precioFinal, id]
    );
    return result.affectedRows > 0;
  },

  borrar: async (id) => {
    const [result] = await pool.query(
      "DELETE FROM pedido WHERE ID_Pedido=?",
      [id]
    );
    return result.affectedRows > 0;
  },
};
