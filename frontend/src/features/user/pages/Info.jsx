import { useEffect, useState } from "react";
import "./info.css";

export default function Info() {
  const [userInfo, setUserInfo] = useState(null);
  const [editInfo, setEditInfo] = useState({});
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [mensaje, setMensaje] = useState("");

  useEffect(() => {
    const usuarioGuardado = localStorage.getItem("usuario");
    if (!usuarioGuardado) {
      console.warn("No hay usuario logueado en localStorage");
      setLoading(false);
      return;
    }

    let user = JSON.parse(usuarioGuardado);
    const userId = user.ID_Cliente || user.ID_cliente || user.id;

    if (!userId) {
      console.warn("No hay ID del usuario guardado");
      setLoading(false);
      return;
    }

    user = { ...user, ID_Cliente: userId };
    localStorage.setItem("usuario", JSON.stringify(user));

    fetch(`http://localhost:3000/cliente/${userId}`)
      .then(res => res.json())
      .then(data => {
        setUserInfo(data);
        setEditInfo({
          Nombre: data.Nombre,
          Apellido: data.Apellido,
          Email: data.Email,
          contrasena: "",
          contorno_pecho: data.contorno_pecho,
          contorno_cintura: data.contorno_cintura,
          contorno_cadera: data.contorno_cadera
        });
        setLoading(false);
      })
      .catch(err => {
        console.error("Error al cargar datos:", err);
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setEditInfo({ ...editInfo, [name]: value });
  };

  const guardarCambios = async () => {
    if (!userInfo?.ID_Cliente) return;

    setSaving(true);
    setMensaje("");

    try {
      const res = await fetch(`http://localhost:3000/cliente/${userInfo.ID_Cliente}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(editInfo)
      });

      const data = await res.json();

      if (!res.ok) throw new Error(data.error || "Error inesperado");

      setMensaje("Cambios guardados correctamente ✔️");

      // Actualizar pantalla
      setUserInfo({ ...userInfo, ...editInfo });

    } catch (err) {
      setMensaje("Hubo un error al guardar los cambios ❌");
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <p>Cargando...</p>;
  if (!userInfo) return <p>No se encontró información del usuario.</p>;

  return (
    <div className="info-container">
      <p className="breadcrumb">Mi perfil › Información de tu perfil</p>

      <h2 className="info-title">Información de tu perfil</h2>

      {/* FORMULARIO EDITABLE */}
      <section className="info-section">
        <h3>Datos personales</h3>

        <label>Nombre</label>
        <input
          name="Nombre"
          value={editInfo.Nombre}
          onChange={handleChange}
        />

        <label>Apellido</label>
        <input
          name="Apellido"
          value={editInfo.Apellido}
          onChange={handleChange}
        />

        <label>Mail</label>
        <input
          name="Email"
          value={editInfo.Email}
          onChange={handleChange}
        />

        <label>Contraseña (ingresá solo si querés cambiarla)</label>
        <input
          type="password"
          name="contrasena"
          value={editInfo.contrasena}
          onChange={handleChange}
        />
      </section>

      <section className="info-section">
        <h3>Medidas corporales</h3>

        <label>Contorno de pecho</label>
        <input
          name="contorno_pecho"
          value={editInfo.contorno_pecho}
          onChange={handleChange}
        />

        <label>Contorno de cintura</label>
        <input
          name="contorno_cintura"
          value={editInfo.contorno_cintura}
          onChange={handleChange}
        />

        <label>Contorno de cadera</label>
        <input
          name="contorno_cadera"
          value={editInfo.contorno_cadera}
          onChange={handleChange}
        />
      </section>

      <button onClick={guardarCambios} disabled={saving}>
        {saving ? "Guardando..." : "Guardar cambios"}
      </button>

      {mensaje && <p style={{ marginTop: "10px" }}>{mensaje}</p>}
    </div>
  );
}
