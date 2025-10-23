import pool from "../../config/conexion.js";

// Obtener todos los pedidos
export const obtenerPedidos = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM pedido");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un pedido por ID
export const obtenerPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM pedido WHERE ID_Pedido = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un pedido
export const crearPedido = async (req, res) => {
  try {
    const { Fecha, Estado, PrecioFinal } = req.body;

    const [result] = await pool.query(
      "INSERT INTO pedido (Fecha, Estado, PrecioFinal) VALUES (?, ?, ?)",
      [Fecha, Estado, PrecioFinal]
    );

    res.status(201).json({ message: "Pedido creado", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar un pedido
export const actualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { Fecha, Estado, PrecioFinal } = req.body;

    const [result] = await pool.query(
      "UPDATE pedido SET Fecha = ?, Estado = ?, PrecioFinal = ? WHERE ID_Pedido = ?",
      [Fecha, Estado, PrecioFinal, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json({ message: "Pedido actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrar un pedido
export const borrarPedido = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM pedido WHERE ID_Pedido = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Pedido no encontrado" });
    }

    res.json({ message: "Pedido eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
