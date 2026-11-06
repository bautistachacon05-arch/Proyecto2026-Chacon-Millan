
import { useState } from 'react'

/**
 * Muestra productos y reservas agregados al carrito.
 */
function Carrito({
  carrito,
  cambiarCantidad,
  eliminarProducto,
  vaciarCarrito
}) {
  const [mostrarFormulario, setMostrarFormulario] = useState(false)
  const [nombre, setNombre] = useState('')
  const [telefono, setTelefono] = useState('')
  const [entrega, setEntrega] = useState('')
  const [pago, setPago] = useState('')
  const [error, setError] = useState('')

  const total = carrito.reduce(
    (acumulado, item) =>
      acumulado + item.precio * item.cantidad,
    0
  )

  /**
   * Confirma un pedido simulado.
   */
  const confirmarPedido = (evento) => {
    evento.preventDefault()

    if (!nombre.trim()) {
      setError('El nombre es obligatorio.')
      return
    }

    if (carrito.length === 0) {
      setError('El carrito está vacío.')
      return
    }

    const pedido = {
      nombre: nombre.trim(),
      telefono,
      entrega: entrega || 'Sin especificar',
      pago: pago || 'Sin especificar',
      items: carrito,
      total
    }

    // Pedido simulado: no se envía a un servidor.
    console.log('Pedido registrado:', pedido)

    alert(
      `¡Pedido registrado correctamente, ${nombre.trim()}!`
    )

    vaciarCarrito()
    setNombre('')
    setTelefono('')
    setEntrega('')
    setPago('')
    setError('')
    setMostrarFormulario(false)
  }

  return (
    <section className="carrito-pagina">
      <h2>Carrito de compras</h2>

      {carrito.length === 0 ? (
        <p>Tu carrito está vacío.</p>
      ) : (
        <>
          {!mostrarFormulario ? (
            <>
              {carrito.map((item) => (
                <article
                  key={item.id}
                  className="item-carrito"
                >
                  <h3>{item.nombre}</h3>

                  {item.tipo === 'reserva' && (
                    <>
                      <p>
                        <strong>Cancha:</strong> {item.cancha}
                      </p>

                      <p>
                        <strong>Fecha:</strong> {item.fecha}
                      </p>

                      <p>
                        <strong>Horario:</strong> {item.hora}
                      </p>

                      <p>
                        <strong>Personas:</strong> {item.personas}
                      </p>
                    </>
                  )}

                  <p>
                    Precio: ${item.precio.toLocaleString('es-AR')}
                  </p>

                  {item.tipo !== 'reserva' && (
                    <p>Cantidad: {item.cantidad}</p>
                  )}

                  <p>
                    Subtotal: $
                    {(item.precio * item.cantidad)
                      .toLocaleString('es-AR')}
                  </p>

                  <div className="acciones-carrito">
                    {item.tipo !== 'reserva' && (
                      <>
                        <button
                          type="button"
                          aria-label={`Quitar una unidad de ${item.nombre}`}
                          onClick={() =>
                            cambiarCantidad(item.id, -1)
                          }
                        >
                          -
                        </button>

                        <button
                          type="button"
                          aria-label={`Agregar una unidad de ${item.nombre}`}
                          onClick={() =>
                            cambiarCantidad(item.id, 1)
                          }
                        >
                          +
                        </button>
                      </>
                    )}

                    <button
                      type="button"
                      onClick={() => eliminarProducto(item.id)}
                    >
                      {item.tipo === 'reserva'
                        ? 'Eliminar reserva'
                        : 'Eliminar'}
                    </button>
                  </div>
                </article>
              ))}

              <h3>
                Total: ${total.toLocaleString('es-AR')}
              </h3>

              <div className="acciones-carrito">
                <button
                  className="boton"
                  type="button"
                  onClick={() => setMostrarFormulario(true)}
                >
                  Comprar
                </button>

                <button
                  className="boton secundario"
                  type="button"
                  onClick={vaciarCarrito}
                >
                  Vaciar carrito
                </button>
              </div>
            </>
          ) : (
            <form
              className="checkout-form"
              onSubmit={confirmarPedido}
              noValidate
            >
              <h3>Completar compra</h3>

              <p>Solo el nombre es obligatorio.</p>

              <div className="control">
                <label htmlFor="nombre">
                  Nombre y apellido *
                </label>

                <input
                  id="nombre"
                  type="text"
                  value={nombre}
                  onChange={(evento) => {
                    setNombre(evento.target.value)
                    setError('')
                  }}
                  aria-invalid={Boolean(error)}
                  aria-describedby={
                    error ? 'error-checkout' : undefined
                  }
                  maxLength={100}
                />
              </div>

              <div className="control">
                <label htmlFor="telefono">
                  Teléfono (opcional)
                </label>

                <input
                  id="telefono"
                  type="tel"
                  value={telefono}
                  onChange={(evento) =>
                    setTelefono(evento.target.value)
                  }
                />
              </div>

              <fieldset className="grupo-opciones">
                <legend>
                  Forma de entrega (opcional)
                </legend>

                <label>
                  <input
                    type="radio"
                    name="entrega"
                    value="Retiro"
                    checked={entrega === 'Retiro'}
                    onChange={(evento) =>
                      setEntrega(evento.target.value)
                    }
                  />
                  Retiro personalmente
                </label>

                <label>
                  <input
                    type="radio"
                    name="entrega"
                    value="Envio"
                    checked={entrega === 'Envio'}
                    onChange={(evento) =>
                      setEntrega(evento.target.value)
                    }
                  />
                  Envío a domicilio
                </label>
              </fieldset>

              <fieldset className="grupo-opciones">
                <legend>
                  Forma de pago (opcional)
                </legend>

                {[
                  'Efectivo',
                  'Tarjeta',
                  'Transferencia'
                ].map((opcion) => (
                  <label key={opcion}>
                    <input
                      type="radio"
                      name="pago"
                      value={opcion}
                      checked={pago === opcion}
                      onChange={(evento) =>
                        setPago(evento.target.value)
                      }
                    />
                    {opcion}
                  </label>
                ))}
              </fieldset>

              {error && (
                <p
                  id="error-checkout"
                  className="mensaje-error"
                  role="alert"
                >
                  {error}
                </p>
              )}

              <div className="acciones-carrito">
                <button
                  className="boton"
                  type="submit"
                >
                  Hacer pedido
                </button>

                <button
                  type="button"
                  className="boton secundario"
                  onClick={() =>
                    setMostrarFormulario(false)
                  }
                >
                  Volver al carrito
                </button>
              </div>
            </form>
          )}
        </>
      )}
    </section>
  )
}

export default Carrito
