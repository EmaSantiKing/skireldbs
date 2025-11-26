// src/controller/pedidos.controller.js
import pool from "../../config/conexion.js";

// Obtener todos los pedidos
export const obtenerPedidos = async (req, res) => {
  try {
    const [rows] = await pool.query(
      `SELECT p.*, c.Nombre AS ClienteNombre, c.Email AS ClienteEmail
       FROM pedido p
       JOIN cliente c ON p.ID_Cliente = c.ID_Cliente`
    );
    res.json(rows);
  } catch (err) {
    console.error("obtenerPedidos error:", err);
    res.status(500).json({ error: "Error al obtener pedidos" });
  }
};

// Obtener pedido por ID_Pedido
export const obtenerPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      `SELECT p.*, c.Nombre AS ClienteNombre, c.Email AS ClienteEmail
       FROM pedido p
       JOIN cliente c ON p.ID_Cliente = c.ID_Cliente
       WHERE p.ID_Pedido = ?`,
      [id]
    );
    if (rows.length === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json(rows[0]);
  } catch (err) {
    console.error("obtenerPedido error:", err);
    res.status(500).json({ error: "Error al obtener el pedido" });
  }
};

// Crear pedido
export const crearPedido = async (req, res) => {
  try {
    const { ID_Cliente, PrecioFinal, items } = req.body;

    // Validación básica
    if (ID_Cliente == null || PrecioFinal == null) {
      return res.status(400).json({ error: "Faltan datos para crear pedido" });
    }

    const Fecha = new Date().toISOString().split("T")[0]; // YYYY-MM-DD
    const Estado = "Pendiente";

    console.log("Creando pedido con:", { ID_Cliente, PrecioFinal, items });

    // Insertar pedido
    const [result] = await pool.query(
      `INSERT INTO pedido (Fecha, Estado, PrecioFinal, ID_Cliente)
       VALUES (?, ?, ?, ?)`,
      [Fecha, Estado, PrecioFinal, ID_Cliente]
    );

    const pedidoId = result.insertId;

    // Si no hay items, devolvemos el pedido creado
    if (!items || !Array.isArray(items) || items.length === 0) {
      console.log("Pedido creado sin items. ID:", pedidoId);
      return res.status(201).json({ message: "Pedido creado", id: pedidoId });
    }

    // Normalizar items: aceptar ID_prenda o ID_Producto, convertir cantidad y tomar telas/colores
    const itemsNormalized = items.map(i => ({
      ID_prenda: i.ID_prenda ?? i.ID_Producto ?? null,
      Cantidad: Number(i.Cantidad ?? i.cantidad ?? 0),
      // No vamos a insertar PrecioUnitario porque la tabla no lo tiene
      telaSeleccionada: i.telaSeleccionada ?? i.tela ?? null,
      colorSeleccionado: i.colorSeleccionado ?? i.color ?? null
    }));

    // Filtrar items inválidos (cantidad > 0)
    const validItems = itemsNormalized.filter(it => Number(it.Cantidad) > 0);

    // Insertar en itempedido usando solo las columnas que existen en tu tabla
    const insertPromises = validItems.map(item =>
      pool.query(
        `INSERT INTO itempedido
         (ID_pedido, ID_prenda, Cantidad, telaSeleccionada, colorSeleccionado)
         VALUES (?, ?, ?, ?, ?)`,
        [
          pedidoId,
          item.ID_prenda,
          item.Cantidad,
          item.telaSeleccionada,
          item.colorSeleccionado
        ]
      )
    );

    await Promise.all(insertPromises);

    console.log("Pedido creado con ID:", pedidoId, "Items insertados:", validItems.length);
    res.status(201).json({ message: "Pedido creado", id: pedidoId });
  } catch (err) {
    console.error("crearPedido error:", err);
    console.error("sqlMessage:", err.sqlMessage);
    res.status(500).json({ error: "Error al crear el pedido", detail: err.sqlMessage || err.message });
  }
};

// Actualizar pedido
export const actualizarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const { Estado } = req.body;  // solo recibimos el estado

    // Actualizamos solo el estado
    const [result] = await pool.query(
      `UPDATE pedido
       SET Estado = ?
       WHERE ID_Pedido = ?`,
      [Estado, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Pedido no encontrado" });

    res.json({ message: "Pedido actualizado" });
  } catch (err) {
    console.error("actualizarPedido error:", err);
    res.status(500).json({ error: "Error al actualizar el pedido" });
  }
};


// Borrar pedido
export const borrarPedido = async (req, res) => {
  try {
    const { id } = req.params;
    const [result] = await pool.query(`DELETE FROM pedido WHERE ID_Pedido = ?`, [id]);
    if (result.affectedRows === 0) return res.status(404).json({ error: "Pedido no encontrado" });
    res.json({ message: "Pedido eliminado" });
  } catch (err) {
    console.error("borrarPedido error:", err);
    res.status(500).json({ error: "Error al eliminar el pedido" });
  }
};

// Obtener pedidos de un cliente
export const obtenerPedidosPorCliente = async (req, res) => {
  try {
    const { idCliente } = req.params;
    console.log("ID_Cliente recibido:", idCliente);

    const [pedidos] = await pool.query(
      "SELECT * FROM pedido WHERE ID_Cliente = ?",
      [idCliente]
    );
    console.log("Pedidos encontrados:", pedidos);

    const pedidosConItems = await Promise.all(
      pedidos.map(async (pedido) => {
        const [items] = await pool.query(
          "SELECT ID_item_pedido, ID_pedido, ID_prenda, Cantidad, telaSeleccionada, colorSeleccionado FROM itempedido WHERE ID_pedido = ?",
          [pedido.ID_Pedido]
        );
        return { ...pedido, items };
      })
    );

    res.json(pedidosConItems);
  } catch (err) {
    console.error("obtenerPedidosPorCliente error:", err);
    res.status(500).json({ error: "Error interno del servidor" });
  }
};

// Obtener pedido específico de un cliente
export const obtenerPedidoDeCliente = async (req, res) => {
  try {
    const { idCliente, idPedido } = req.params;
    const [rows] = await pool.query(
      `SELECT p.*, c.Nombre AS ClienteNombre, c.Email AS ClienteEmail
       FROM pedido p
       JOIN cliente c ON p.ID_Cliente = c.ID_Cliente
       WHERE p.ID_Cliente = ? AND p.ID_Pedido = ?`,
      [idCliente, idPedido]
    );
    if (rows.length === 0) return res.status(404).json({ error: "No se encontró ese pedido para este cliente" });
    res.json(rows[0]);
  } catch (err) {
    console.error("obtenerPedidoDeCliente error:", err);
    res.status(500).json({ error: "Error al obtener el pedido del cliente" });
  }
};
