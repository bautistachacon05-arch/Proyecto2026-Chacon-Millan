
import { useState } from 'react'

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
 * Devuelve la fecha actual en formato YYYY-MM-DD.
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
 * Valida los datos ingresados en una reserva.
 * @param {object} datos - Datos del formulario.
 * @returns {object} Errores encontrados en cada campo.
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
 * Pantalla de consulta y reserva simulada de canchas.
 * @returns {JSX.Element} Pantalla de canchas.
 */
function Canchas() {
  const [datos, setDatos] = useState({
    cancha: '',
    fecha: '',
    hora: '',
    personas: ''
  })

  const [tocados, setTocados] = useState({})
  const [mensaje, setMensaje] = useState('')

  const canchaSeleccionada = canchas.find(
    (cancha) => String(cancha.id) === datos.cancha
  )

  const errores = validarReserva(datos)

  /**
   * Actualiza los valores del formulario y marca el campo como modificado.
   * @param {React.ChangeEvent<HTMLInputElement|HTMLSelectElement>} evento - Evento del campo.
   * @returns {void}
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
      [name]: true
    }))

    setMensaje('')
  }

  /**
   * Determina si debe mostrarse el error de un campo.
   * @param {string} campo - Nombre del campo.
   * @returns {string|false|undefined} Mensaje de error, si corresponde.
   */
  const mostrarError = (campo) =>
    tocados[campo] && errores[campo]

  /**
   * Valida y confirma una reserva simulada.
   * @param {React.SubmitEvent<HTMLFormElement>} evento - Evento de envío.
   * @returns {void}
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
      setMensaje('')
      return
    }

    setMensaje('¡Reserva simulada registrada correctamente!')

    setDatos({
      cancha: '',
      fecha: '',
      hora: '',
      personas: ''
    })

    setTocados({})
  }

  return (
    <section>
      <h2>Reserva de canchas</h2>
      <p>Elegí una cancha y reservá un horario.</p>

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
              <p id="error-cancha" className="mensaje-error" role="alert">
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
              <p id="error-fecha" className="mensaje-error" role="alert">
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
              <p id="error-hora" className="mensaje-error" role="alert">
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
              <p id="error-personas" className="mensaje-error" role="alert">
                {errores.personas}
              </p>
            )}
          </div>

          <button className="boton" type="submit">
            Confirmar reserva
          </button>
        </form>

        {mensaje && (
          <p className="mensaje" role="status">
            {mensaje}
          </p>
        )}
      </section>
    </section>
  )
}

export default Canchas
