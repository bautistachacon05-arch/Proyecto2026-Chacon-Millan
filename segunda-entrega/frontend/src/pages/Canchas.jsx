
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const canchas = [
  {
    id: 1,
    nombre: 'Fútbol 5',
    precio: 3500,
    imagen: 'cancha_futbol.jpg',
    horarios: ['09:00', '11:00', '14:00', '16:00', '20:00']
  },
  {
    id: 2,
    nombre: 'Pádel 1',
    precio: 2800,
    imagen: 'cancha_padel.jpg',
    horarios: ['08:00', '10:00', '12:00', '15:00', '18:00']
  },
  {
    id: 3,
    nombre: 'Pádel 2',
    precio: 2800,
    imagen: 'cancha_padel.jpg',
    horarios: ['09:00', '11:00', '13:00', '17:00', '19:00']
  },
  {
    id: 4,
    nombre: 'Tenis',
    precio: 2200,
    imagen: 'cancha_tenis.png',
    horarios: ['08:00', '10:00', '14:00', '16:00', '18:00']
  },
  {
    id: 5,
    nombre: 'Básquet',
    precio: 3000,
    imagen: 'cancha_basket.avif',
    horarios: ['10:00', '13:00', '16:00', '19:00', '21:00']
  }
]

/**
 * Obtiene la fecha actual en formato YYYY-MM-DD.
 * @returns {string} Fecha local actual.
 */
const fechaActual = () => {
  const hoy = new Date()
  const anio = hoy.getFullYear()
  const mes = String(hoy.getMonth() + 1).padStart(2, '0')
  const dia = String(hoy.getDate()).padStart(2, '0')

  return `${anio}-${mes}-${dia}`
}

/**
 * Valida los datos ingresados en el formulario de reserva.
 * @param {object} datos - Datos del formulario.
 * @returns {object} Errores encontrados.
 */
const validarReserva = (datos) => {
  const errores = {}

  const cancha = canchas.find(
    (item) => String(item.id) === datos.cancha
  )

  if (!cancha) {
    errores.cancha = 'Seleccioná una cancha.'
  }

  if (!datos.fecha) {
    errores.fecha = 'Seleccioná una fecha.'
  } else if (datos.fecha < fechaActual()) {
    errores.fecha = 'La fecha no puede ser anterior a hoy.'
  }

  if (!datos.hora) {
    errores.hora = 'Seleccioná un horario.'
  } else if (cancha && !cancha.horarios.includes(datos.hora)) {
    errores.hora = 'El horario no corresponde a la cancha.'
  } else if (
    datos.fecha === fechaActual() &&
    datos.hora <= new Date().toTimeString().slice(0, 5)
  ) {
    errores.hora = 'El horario seleccionado ya pasó.'
  }

  const personas = Number(datos.personas)

  if (
    !datos.personas ||
    !Number.isInteger(personas) ||
    personas < 1 ||
    personas > 20
  ) {
    errores.personas = 'Ingresá entre 1 y 20 personas.'
  }

  return errores
}

/**
 * Página de canchas con reservas integradas al carrito.
 * @param {object} props - Propiedades del componente.
 * @param {Function} props.onAgregarReserva - Agrega una reserva al carrito.
 * @returns {JSX.Element} Página de canchas.
 */
function Canchas({ onAgregarReserva }) {
  const navigate = useNavigate()

  const [datos, setDatos] = useState({
    cancha: '',
    fecha: '',
    hora: '',
    personas: ''
  })

  const [tocados, setTocados] = useState({})

  const canchaSeleccionada = canchas.find(
    (cancha) => String(cancha.id) === datos.cancha
  )

  const errores = validarReserva(datos)

  /**
   * Actualiza los datos y marca el campo como modificado.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} evento - Cambio del formulario.
   */
  const modificarCampo = (evento) => {
    const { name, value } = evento.target

    setDatos((anterior) => ({
      ...anterior,
      [name]: value,
      ...(name === 'cancha' ? { hora: '' } : {})
    }))

    setTocados((anterior) => ({
      ...anterior,
      [name]: true,
      ...(name === 'cancha' ? { hora: false } : {})
    }))
  }

  const mostrarError = (campo) =>
    tocados[campo] && errores[campo]

  /**
   * Agrega una reserva válida al carrito y abre la página Carrito.
   * @param {React.SubmitEvent<HTMLFormElement>} evento - Envío del formulario.
   */
  const reservar = (evento) => {
    evento.preventDefault()

    setTocados({
      cancha: true,
      fecha: true,
      hora: true,
      personas: true
    })

    const erroresActuales = validarReserva(datos)

    if (Object.keys(erroresActuales).length > 0) {
      return
    }

    const reserva = {
      nombre: `Reserva: ${canchaSeleccionada.nombre}`,
      canchaId: canchaSeleccionada.id,
      cancha: canchaSeleccionada.nombre,
      fecha: datos.fecha,
      hora: datos.hora,
      personas: Number(datos.personas),
      precio: canchaSeleccionada.precio
    }

    onAgregarReserva(reserva)

    setDatos({
      cancha: '',
      fecha: '',
      hora: '',
      personas: ''
    })

    setTocados({})

    navigate('/carrito')
  }

  return (
    <section>
      <h2>Reserva de canchas</h2>

      <p>
        Elegí una cancha, una fecha y un horario.
        Después agregá la reserva al carrito.
      </p>

      <div className="canchas">
        {canchas.map((cancha) => (
          <article className="card cancha" key={cancha.id}>
            <img
              src={`/imagenes/${cancha.imagen}`}
              alt={`Cancha de ${cancha.nombre}`}
            />

            <h3>{cancha.nombre}</h3>

            <p>
              ${cancha.precio.toLocaleString('es-AR')} por hora
            </p>

            <p>
              Horarios: {cancha.horarios.join(' - ')}
            </p>
          </article>
        ))}
      </div>

      <section className="bloque reserva">
        <h2>Reservar</h2>

        <form onSubmit={reservar} noValidate>
          <div className="control">
            <label htmlFor="cancha">Cancha *</label>

            <select
              id="cancha"
              name="cancha"
              value={datos.cancha}
              onChange={modificarCampo}
              aria-invalid={Boolean(mostrarError('cancha'))}
              aria-describedby={
                mostrarError('cancha') ? 'error-cancha' : undefined
              }
            >
              <option value="">Elegir cancha</option>

              {canchas.map((cancha) => (
                <option key={cancha.id} value={cancha.id}>
                  {cancha.nombre}
                </option>
              ))}
            </select>

            {mostrarError('cancha') && (
              <p
                id="error-cancha"
                className="mensaje-error"
                role="alert"
              >
                {errores.cancha}
              </p>
            )}
          </div>

          <div className="control">
            <label htmlFor="fecha">Fecha *</label>

            <input
              id="fecha"
              name="fecha"
              type="date"
              min={fechaActual()}
              value={datos.fecha}
              onChange={modificarCampo}
              aria-invalid={Boolean(mostrarError('fecha'))}
              aria-describedby={
                mostrarError('fecha') ? 'error-fecha' : undefined
              }
            />

            {mostrarError('fecha') && (
              <p
                id="error-fecha"
                className="mensaje-error"
                role="alert"
              >
                {errores.fecha}
              </p>
            )}
          </div>

          <div className="control">
            <label htmlFor="hora">Horario *</label>

            <select
              id="hora"
              name="hora"
              value={datos.hora}
              onChange={modificarCampo}
              disabled={!canchaSeleccionada}
              aria-invalid={Boolean(mostrarError('hora'))}
              aria-describedby={
                mostrarError('hora') ? 'error-hora' : undefined
              }
            >
              <option value="">Elegir horario</option>

              {canchaSeleccionada?.horarios.map((hora) => (
                <option key={hora} value={hora}>
                  {hora}
                </option>
              ))}
            </select>

            {mostrarError('hora') && (
              <p
                id="error-hora"
                className="mensaje-error"
                role="alert"
              >
                {errores.hora}
              </p>
            )}
          </div>

          <div className="control">
            <label htmlFor="personas">Personas *</label>

            <input
              id="personas"
              name="personas"
              type="number"
              min="1"
              max="20"
              value={datos.personas}
              onChange={modificarCampo}
              aria-invalid={Boolean(mostrarError('personas'))}
              aria-describedby={
                mostrarError('personas') ? 'error-personas' : undefined
              }
            />

            {mostrarError('personas') && (
              <p
                id="error-personas"
                className="mensaje-error"
                role="alert"
              >
                {errores.personas}
              </p>
            )}
          </div>

          <button className="boton" type="submit">
            Agregar reserva al carrito
          </button>
        </form>
      </section>
    </section>
  )
}

export default Canchas
