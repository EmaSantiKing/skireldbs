import pool from "../../config/conexion.js";

export const ItemPedidoModel = {
  crear: async (cantidad, tela, color, id_pedido, id_prenda) => {
    const [result] = await pool.query(
      "INSERT INTO itempedido (Cantidad, telaSeleccionada, colorSeleccionado, ID_pedido, ID_prenda) VALUES (?, ?, ?, ?, ?)",
      [cantidad, tela, color, id_pedido, id_prenda]
    );
    return result.insertId;
  },

  obtenerPorPedido: async (id_pedido) => {
    const [rows] = await pool.query(
      `SELECT ip.*, pr.Nombre AS PrendaNombre, pr.precioBase
       FROM itempedido ip
       JOIN prenda pr ON ip.ID_prenda = pr.ID_Prenda
       WHERE ip.ID_pedido = ?`,
      [id_pedido]
    );
    return rows;
  },
};
