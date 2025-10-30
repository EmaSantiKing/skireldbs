import pool from "../../config/conexion.js";

// Obtener todos los pedidos
export const obtenerPedidos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, u.Nombre as ClienteNombre, u.Email as ClienteEmail
       FROM pedido p
       JOIN usuario u ON p.ID_Cliente = u.ID_Usuario`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener pedido por ID
export const obtenerPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT p.*, u.Nombre as ClienteNombre, u.Email as ClienteEmail
       FROM pedido p
       JOIN usuario u ON p.ID_Cliente = u.ID_Usuario
       WHERE p.ID_Pedido=?`,
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear pedido
export const crearPedido = async (req, res) => {
  try {
    const { Fecha, Estado, PrecioFinal, ID_Cliente } = req.body;
    const [result] = await pool.query(
      "INSERT INTO pedido (Fecha, Estado, PrecioFinal, ID_Cliente) VALUES (?, ?, ?, ?)",
      [Fecha, Estado, PrecioFinal, ID_Cliente]
    );
    res.status(201).json({ message: "Pedido creado", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar pedido
export const actualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { Fecha, Estado, PrecioFinal, ID_Cliente } = req.body;

    const [result] = await pool.query(
      "UPDATE pedido SET Fecha=?, Estado=?, PrecioFinal=?, ID_Cliente=? WHERE ID_Pedido=?",
      [Fecha, Estado, PrecioFinal, ID_Cliente, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ message: "Pedido actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrar pedido
export const borrarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM pedido WHERE ID_Pedido=?", [id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ message: "Pedido eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
