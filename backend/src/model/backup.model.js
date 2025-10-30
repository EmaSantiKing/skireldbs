import pool from "../../config/conexion.js";

export const registrarBackup = async (nombreArchivo, ruta) => {
  await pool.query(
    "INSERT INTO backups (nombre_archivo, ruta) VALUES (?, ?)",
    [nombreArchivo, ruta]
  );
};

export const obtenerBackups = async () => {
  const [rows] = await pool.query("SELECT * FROM backups ORDER BY fecha DESC");
  return rows;
};
