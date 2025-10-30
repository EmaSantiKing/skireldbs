import pool from "../../config/conexion.js";

// Obtener todos los items de pedidos
export const obtenerItemsPedido = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT i.*, p.Nombre as PrendaNombre, ped.Fecha as FechaPedido, ped.Estado as EstadoPedido
       FROM itempedido i
       JOIN prenda p ON i.ID_prenda = p.ID_Prenda
       JOIN pedido ped ON i.ID_pedido = ped.ID_Pedido`
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un item de pedido por ID
export const obtenerItemPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT i.*, p.Nombre as PrendaNombre, ped.Fecha as FechaPedido, ped.Estado as EstadoPedido
       FROM itempedido i
       JOIN prenda p ON i.ID_prenda = p.ID_Prenda
       JOIN pedido ped ON i.ID_pedido = ped.ID_Pedido
       WHERE i.ID_item_pedido=?`,
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Item de pedido no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear un item de pedido
export const crearItemPedido = async (req, res) => {
  try {
    const { ID_pedido, ID_prenda, Cantidad, telaSeleccionada, colorSeleccionado } = req.body;

    if (!ID_pedido || !ID_prenda || !Cantidad) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const [result] = await pool.query(
      "INSERT INTO itempedido (ID_pedido, ID_prenda, Cantidad, telaSeleccionada, colorSeleccionado) VALUES (?, ?, ?, ?, ?)",
      [ID_pedido, ID_prenda, Cantidad, telaSeleccionada || '', colorSeleccionado || '']
    );

    res.status(201).json({ message: "Item de pedido creado", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar item de pedido
export const actualizarItemPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { ID_pedido, ID_prenda, Cantidad, telaSeleccionada, colorSeleccionado } = req.body;

    const [result] = await pool.query(
      "UPDATE itempedido SET ID_pedido=?, ID_prenda=?, Cantidad=?, telaSeleccionada=?, colorSeleccionado=? WHERE ID_item_pedido=?",
      [ID_pedido, ID_prenda, Cantidad, telaSeleccionada, colorSeleccionado, id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Item de pedido no encontrado" });
    res.json({ message: "Item de pedido actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrar item de pedido
export const borrarItemPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query("DELETE FROM itempedido WHERE ID_item_pedido=?", [id]);

    if (result.affectedRows === 0) return res.status(404).json({ error: "Item de pedido no encontrado" });
    res.json({ message: "Item de pedido eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
