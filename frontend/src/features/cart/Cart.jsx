import { useState, useEffect } from "react";
import Login from "../auth/components/login";
import "./Cart.css";

export default function Cart() {
  const [carrito, setCarrito] = useState([]);
  const [cliente, setCliente] = useState(null);
  const [showLogin, setShowLogin] = useState(false);
  const [historial, setHistorial] = useState([]);

  // Cargar carrito y cliente desde localStorage
  useEffect(() => {
    const savedCart = JSON.parse(localStorage.getItem("carrito")) || [];
    setCarrito(savedCart);

    const savedCliente = JSON.parse(localStorage.getItem("usuario"));
    if (savedCliente) setCliente(savedCliente);
  }, []);

  // Traer historial de pedidos del cliente o todos si es diseñadora
  useEffect(() => {
    if (!cliente) return;

    const fetchHistorial = async () => {
      try {
        const url =
          cliente?.Email === "diseñadora@gmail.com"
            ? "http://localhost:3000/pedidos"
            : `http://localhost:3000/pedidos/cliente/${cliente.ID_cliente}`;

        const res = await fetch(url);
        const data = await res.json();

        const pedidosConItems = data.map((pedido) => ({
          ...pedido,
          items: Array.isArray(pedido.items) ? pedido.items : [],
        }));

        setHistorial(pedidosConItems);
      } catch (err) {
        console.error("Error cargando historial:", err);
        setHistorial([]);
      }
    };

    fetchHistorial();
  }, [cliente]);

  const calcularTotal = () =>
    carrito.reduce((acc, item) => acc + item.precio * item.cantidad, 0);

  const finalizarCompra = async () => {
    if (!cliente) {
      setShowLogin(true);
      return;
    }

    const total = calcularTotal();
    const fecha = new Date().toISOString().split("T")[0];

    const body = {
      Fecha: fecha,
      Estado: "Pendiente",
      PrecioFinal: total,
      ID_Cliente: cliente.ID_cliente,
      items: carrito.map((item) => ({
        ID_Producto: item.id,
        Cantidad: item.cantidad,
        telaSeleccionada: item.telaSeleccionada || null,
        colorSeleccionado: item.colorSeleccionado || null,
      })),
    };

    try {
      const res = await fetch("http://localhost:3000/pedidos", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(body),
      });

      if (!res.ok) throw new Error("Error al crear el pedido");

      const data = await res.json();
      alert(`Pedido creado con éxito! ID: ${data.id}`);

      setCarrito([]);
      localStorage.removeItem("carrito");

      // Agregamos items completos para que el historial los muestre
      setHistorial((prev) => [
        ...prev,
        {
          ...body,
          ID_Pedido: data.id,
          items: carrito.map((item) => ({
            ...item,
            Cantidad: item.cantidad,
          })),
        },
      ]);
    } catch (err) {
      console.error(err);
      alert("Error al crear el pedido");
    }
  };

  const handleLoginSuccess = (clienteData) => {
    setCliente(clienteData);
    setShowLogin(false);
    alert("Credencial válida. Ahora se puede crear el pedido.");
  };

  const cambiarCantidad = (id, nuevaCantidad) => {
    setCarrito((prev) =>
      prev.map((item) =>
        item.id === id ? { ...item, cantidad: Number(nuevaCantidad) } : item
      )
    );
  };

  const eliminarProducto = (id) => {
    setCarrito((prev) => prev.filter((item) => item.id !== id));
  };

  // Cambiar estado de un pedido (solo para diseñadora)
  const cambiarEstadoPedido = async (idPedido, nuevoEstado) => {
    try {
      const res = await fetch(`http://localhost:3000/pedidos/${idPedido}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ Estado: nuevoEstado }),
      });
      if (!res.ok) throw new Error("Error al actualizar estado");

      setHistorial((prev) =>
        prev.map((p) =>
          p.ID_Pedido === idPedido ? { ...p, Estado: nuevoEstado } : p
        )
      );
    } catch (err) {
      console.error(err);
      alert("No se pudo actualizar el estado");
    }
  };

  return (
    <div className="cart-page">
      <h2>Carrito de Compras</h2>

      {carrito.length === 0 ? (
        <p>El carrito está vacío</p>
      ) : (
        <ul className="cart-list">
          {carrito.map((item) => (
            <li key={item.id} className="cart-item">
              <img
                src={
                  item.imagen
                    ? `http://localhost:3000/${item.imagen}`
                    : "/images/placeholder.jpg"
                }
                alt={item.nombre}
                className="cart-img"
              />
              <div className="cart-info">
                <strong>{item.nombre}</strong>
                <p>
                  Cantidad:
                  <input
                    type="number"
                    min="1"
                    value={item.cantidad}
                    onChange={(e) =>
                      cambiarCantidad(item.id, e.target.value)
                    }
                    style={{ width: "50px", marginLeft: "5px" }}
                  />
                </p>
                <p>Precio unitario: ${item.precio}</p>
                <p>Subtotal: ${item.precio * item.cantidad}</p>
                {item.telaSeleccionada && <p>Tela: {item.telaSeleccionada}</p>}
                {item.colorSeleccionado && (
                  <p>Color: {item.colorSeleccionado}</p>
                )}
                <button onClick={() => eliminarProducto(item.id)}>
                  Eliminar
                </button>
              </div>
            </li>
          ))}
        </ul>
      )}

      <div className="cart-total">Total: ${calcularTotal()}</div>
      <button className="finalizar-btn" onClick={finalizarCompra}>
        Finalizar Compra
      </button>

      {showLogin && (
        <Login
          onClose={() => setShowLogin(false)}
          onLogin={handleLoginSuccess}
          modoCarrito
        />
      )}

      {/* Historial de Pedidos */}
      {cliente && (
        <div className="historial-pedidos">
          <h2>Historial de Pedidos</h2>
          {historial.length === 0 ? (
            <p>No hay pedidos aún.</p>
          ) : (
            <ul>
              {historial.map((pedido) => (
                <li key={pedido.ID_Pedido} className="pedido-item">
                  <p>
                    <strong>Pedido #{pedido.ID_Pedido}</strong> -{" "}
                    {new Date(pedido.Fecha).toLocaleString()}
                  </p>
                  <p>
                    Estado:{" "}
                    {cliente?.Email === "diseñadora@gmail.com" ? (
                      <select
                        value={pedido.Estado}
                        onChange={(e) =>
                          cambiarEstadoPedido(pedido.ID_Pedido, e.target.value)
                        }
                      >
                        <option value="Pendiente">Pendiente</option>
                        <option value="En Proceso">En Proceso</option>
                        <option value="Finalizado">Finalizado</option>
                        <option value="Cancelado">Cancelado</option>
                      </select>
                    ) : (
                      pedido.Estado
                    )}
                  </p>
                  <p>Total: ${pedido.PrecioFinal}</p>
                  <ul>
                    {pedido.items.length === 0 ? (
                      <li>No hay productos asociados</li>
                    ) : (
                      pedido.items.map((i, idx) => (
                        <li key={idx}>
                          {i.NombreProducto || i.nombre || "Prenda"} x{i.Cantidad} ($
                          {i.precio ?? "?"})
                          {i.telaSeleccionada && ` - Tela: ${i.telaSeleccionada}`}
                          {i.colorSeleccionado && ` - Color: ${i.colorSeleccionado}`}
                        </li>
                      ))
                    )}
                  </ul>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
}
