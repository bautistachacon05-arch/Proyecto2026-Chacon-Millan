
import { Link } from 'react-router-dom'

/**
 * Muestra información general sobre SportZone.
 * @returns {JSX.Element} Página informativa.
 */
function Info() {
  return (
    <section className="pagina-info">
      <h2>Sobre SportZone</h2>

      <p>
        SportZone es un proyecto académico dedicado a mostrar
        productos deportivos y ofrecer reservas simuladas de canchas.
      </p>

      <div className="info-list">
        <article className="caja">
          <h3>¿Qué es SportZone?</h3>
          <p>
            Es una página web donde podés explorar artículos deportivos
            y consultar distintas canchas disponibles.
          </p>
        </article>

        <article className="caja">
          <h3>¿Qué se puede hacer?</h3>
          <p>
            Buscar productos, filtrarlos por categoría, agregarlos
            al carrito y simular una reserva deportiva.
          </p>
        </article>

        <article className="caja">
          <h3>¿Cómo funciona el carrito?</h3>
          <p>
            Podés agregar productos, modificar sus cantidades,
            eliminarlos y confirmar un pedido.
          </p>
          <p>
            Para confirmar una compra solamente es obligatorio
            ingresar tu nombre.
          </p>
        </article>

        <article className="caja">
          <h3>¿Las compras y reservas son reales?</h3>
          <p>
            No. SportZone es un proyecto académico y las operaciones
            se realizan de manera simulada.
          </p>
        </article>

        <article className="caja">
          <h3>Tecnologías utilizadas</h3>
          <p>
            React, Vite, JavaScript, React Router, SASS,
            JSON Server y localStorage.
          </p>
        </article>
      </div>

      <div className="info-acciones">
        <Link to="/productos" className="boton">
          Ver productos
        </Link>

        <Link to="/canchas" className="boton secundario">
          Ver canchas
        </Link>
      </div>
    </section>
  )
}

export default Info
