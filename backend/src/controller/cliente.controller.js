import pool from "../../config/conexion.js";
import bcrypt from "bcryptjs";

// Obtener todos los usuarios
export const obtenerClientes = async (req, res) => {
  try {
    const [rows] = await pool.query(
      "SELECT ID_Cliente, Nombre, Apellido, Email, contorno_pecho, contorno_cintura, contorno_cadera FROM cliente"
    );
    res.json(rows);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Obtener un usuario por ID
export const obtenerCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const [rows] = await pool.query(
      "SELECT ID_Cliente, Nombre, Apellido, Email, contorno_pecho, contorno_cintura, contorno_cadera FROM cliente WHERE ID_Cliente = ?",
      [id]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Usuario no encontrado" });

    res.json(rows[0]);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Crear cliente
export const crearCliente = async (req, res) => {
  try {
    const { Nombre, Apellido, Email, contrasena, contorno_pecho = 0, contorno_cintura = 0, contorno_cadera = 0 } = req.body;

    if (!Nombre || !Apellido || !Email || !contrasena) {
      return res.status(400).json({ error: "Faltan datos obligatorios" });
    }

    const hash = await bcrypt.hash(contrasena, 10);

    const [result] = await pool.query(
      "INSERT INTO cliente (Nombre, Apellido, Email, PasswordHash, contorno_pecho, contorno_cintura, contorno_cadera) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [Nombre, Apellido, Email, hash, contorno_pecho, contorno_cintura, contorno_cadera]
    );

    res.status(201).json({ message: "Cliente creado", id: result.insertId });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Actualizar cliente
export const actualizarCliente = async (req, res) => {
  try {
    const { id } = req.params;
    const { Nombre, Apellido, Email, contrasena, contorno_pecho = 0, contorno_cintura = 0, contorno_cadera = 0 } = req.body;

    let query = "UPDATE cliente SET Nombre=?, Apellido=?, Email=?, contorno_pecho=?, contorno_cintura=?, contorno_cadera=?";
    let params = [Nombre, Apellido, Email, contorno_pecho, contorno_cintura, contorno_cadera];

    if (contrasena) {
      const hash = await bcrypt.hash(contrasena, 10);
      query += ", PasswordHash=?";
      params.push(hash);
    }

    query += " WHERE ID_Cliente=?";
    params.push(id);

    const [result] = await pool.query(query, params);

    if (result.affectedRows === 0)
      return res.status(404).json({ error: "Cliente no encontrado" });

    res.json({ message: "Cliente actualizado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};



// Borrar usuario
export const borrarCliente = async (req, res) => {
  try {
    const { id } = req.params;

    const [result] = await pool.query(
      "DELETE FROM cliente WHERE ID_Cliente=?",
      [id]
    );

    if (result.affectedRows === 0) return res.status(404).json({ error: "Cliente no encontrado" });

    res.json({ message: "Cliente eliminado" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// Login
export const loginCliente = async (req, res) => {
  try {
    const { Email, contrasena } = req.body;
    if (!Email || !contrasena) return res.status(400).json({ error: "Faltan datos obligatorios" });

    const [rows] = await pool.query(
      "SELECT * FROM cliente WHERE Email=?",
      [Email]
    );

    if (rows.length === 0) return res.status(404).json({ error: "Cliente no encontrado" });

    const cliente = rows[0];
    const match = await bcrypt.compare(contrasena, cliente.PasswordHash);

    if (!match) return res.status(401).json({ error: "Contraseña incorrecta" });

    res.json({
      message: "Login exitoso",
      cliente: {
        ID_cliente: cliente.ID_Cliente,
        Nombre: cliente.Nombre,
        Email: cliente.Email,
        Apellido: cliente.Apellido,
        contorno_pecho: cliente.contorno_pecho,
        contorno_cintura: cliente.contorno_cintura,
        contorno_cadera: cliente.contorno_cadera
      }
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
