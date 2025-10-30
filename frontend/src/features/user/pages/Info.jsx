import "./info.css";

export default function Info() {
  const userInfo = {
    personal: {
      dni: "12345678",
      nombreCompleto: "Juan Pérez",
      estadoCivil: "Soltero/a",
      nombreElegido: "JuanMa",
    },
    cuenta: {
      email: "juanperez@example.com",
      telefono: "+54 11 2222-3333",
      nombreUsuario: "juanma_01",
    }
  };

  return (
    <div className="info-container">
      <p className="breadcrumb">Mi perfil › Información de tu perfil</p>

      <h2 className="info-title">Información de tu perfil</h2>
      <p className="info-subtitle">
        Podés agregar, modificar o corregir tu información personal y los datos de tu cuenta.
      </p>

      {/* Información personal */}
      <section className="info-section">
        <h3>Información personal</h3>

        <div className="info-row">
          <span className="info-icon">🆔</span>
          <div>
            <p className="info-label">(Número de DNI)</p>
            <p className="info-value">{userInfo.personal.dni}</p>
          </div>
        </div>

        <div className="info-row">
          <span className="info-icon">👤</span>
          <div>
            <p className="info-label">(Nombre y apellido)</p>
            <p className="info-value">{userInfo.personal.nombreCompleto}</p>
          </div>
        </div>

        <div className="info-row">
          <span className="info-icon">⚧</span>
          <div>
            <p className="info-label">Sexo / Estado civil</p>
            <p className="info-value">{userInfo.personal.estadoCivil}</p>
          </div>
        </div>

        <div className="info-row">
          <span className="info-icon">👥</span>
          <div>
            <p className="info-label">(Username)</p>
            <p className="info-value">{userInfo.personal.nombreElegido}</p>
          </div>
        </div>
      </section>

      {/* Datos de la cuenta */}
      <section className="info-section">
        <h3>Datos de la cuenta</h3>

        <div className="info-row">
          <span className="info-icon">📧</span>
          <div>
            <p className="info-label">(Email del usuario)</p>
            <p className="info-value">{userInfo.cuenta.email}</p>
          </div>
        </div>

        <div className="info-row">
          <span className="info-icon">📞</span>
          <div>
            <p className="info-label">(Número de teléfono)</p>
            <p className="info-value">{userInfo.cuenta.telefono}</p>
          </div>
        </div>

        <div className="info-row">
          <span className="info-icon">👤</span>
          <div>
            <p className="info-label">(Nombre de usuario)</p>
            <p className="info-value">{userInfo.cuenta.nombreUsuario}</p>
          </div>
        </div>
      </section>
    </div>
  );
}
