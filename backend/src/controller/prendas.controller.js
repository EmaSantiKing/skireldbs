import pool from "../../config/conexion.js";

// Obtener todas las prendas
export const obtenerPrendas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM prenda");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener una prenda por ID
export const obtenerPrenda = async (req, res) => {
  try {
    const { id } = req.params;

    const [rows] = await pool.query(
      "SELECT * FROM prenda WHERE ID_Prenda = ?",
      [id]
    );

    if (rows.length === 0) {
      return res.status(404).json({ error: "Prenda no encontrada" });
    }

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear una nueva prenda
export const crearPrenda = async (req, res) => {
  try {
    const { Nombre, Descripcion, precioBase, opcionTela, opcionesColor } = req.body;

    const [result] = await pool.query(
      "INSERT INTO prenda (Nombre, Descripcion, precioBase, opcionTela, opcionesColor) VALUES (?, ?, ?, ?, ?)",
      [Nombre, Descripcion, precioBase, opcionTela, opcionesColor]
    );

    res.status(201).json({ message: "Prenda creada", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar una prenda existente
export const actualizarPrenda = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion, precioBase, opcionTela, opcionesColor } = req.body;

    const [result] = await pool.query(
      "UPDATE prenda SET Nombre = ?, Descripcion = ?, precioBase = ?, opcionTela = ?, opcionesColor = ? WHERE ID_Prenda = ?",
      [Nombre, Descripcion, precioBase, opcionTela, opcionesColor, id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Prenda no encontrada" });
    }

    res.json({ message: "Prenda actualizada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Borrar una prenda
export const borrarPrenda = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM prenda WHERE ID_Prenda = ?",
      [id]
    );

    if (result.affectedRows === 0) {
      return res.status(404).json({ error: "Prenda no encontrada" });
    }

    res.json({ message: "Prenda eliminada" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
