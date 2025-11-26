import pool from "../../config/conexion.js";

// -----------------------------------------
// Obtener todas las prendas
// -----------------------------------------
export const obtenerPrendas = async (req, res) => {
  try {
    const [rows] = await pool.query("SELECT * FROM prenda");
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------------------
// Obtener prenda por ID
// -----------------------------------------
export const obtenerPrenda = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query("SELECT * FROM prenda WHERE ID_Prenda=?", [id]);

    if (rows.length === 0)
      return res.status(404).json({ error: "Prenda no encontrada" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------------------
// Crear prenda (con imagen opcional)
// -----------------------------------------
export const crearPrenda = async (req, res) => {
  try {
    const { Nombre, Descripcion, precioBase, opcionTela, opcionesColor } = req.body;

    const imagen = req.file ? req.file.filename : null; // ← ACEPTA SIN IMAGEN

    const [result] = await pool.query(
      "INSERT INTO prenda (Nombre, Descripcion, precioBase, opcionTela, opcionesColor, imagen) VALUES (?, ?, ?, ?, ?, ?)",
      [Nombre, Descripcion, precioBase, opcionTela, opcionesColor, imagen]
    );

    res.json({
      message: "Prenda creada",
      id: result.insertId,
      imagen: imagen
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};


// -----------------------------------------
// Actualizar prenda (con imagen opcional)
// -----------------------------------------
export const actualizarPrenda = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Descripcion, precioBase, opcionTela, opcionesColor } = req.body;

    // Si llega imagen nueva
    const nuevaImagen = req.file ? req.file.filename : null;

    const [result] = await pool.query(
      `UPDATE prenda 
       SET Nombre=?, Descripcion=?, precioBase=?, opcionTela=?, opcionesColor=?, imagen=IFNULL(?, imagen)
       WHERE ID_Prenda=?`,
      [
        Nombre,
        Descripcion,
        precioBase,
        opcionTela,
        opcionesColor,
        nuevaImagen, // si no viene, mantiene la anterior
        id
      ]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Prenda no encontrada" });

    res.json({ message: "Prenda actualizada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// -----------------------------------------
// Eliminar prenda
// -----------------------------------------
export const eliminarPrenda = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM prenda WHERE ID_Prenda=?",
      [id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Prenda no encontrada" });

    res.json({ message: "Prenda eliminada correctamente" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
