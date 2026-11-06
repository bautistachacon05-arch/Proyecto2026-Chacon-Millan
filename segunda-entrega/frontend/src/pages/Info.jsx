
import { Link } from 'react-router-dom'
import Card from '@/components/Card'

/**
 * Muestra información general sobre SportZone.
 * @returns {React.ReactElement} Página informativa.
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
        <Card titulo="¿Qué es SportZone?">
          <p>
            Es una página web donde podés explorar artículos deportivos
            y consultar distintas canchas disponibles.
          </p>
        </Card>

        <Card titulo="¿Qué se puede hacer?">
          <p>
            Buscar productos, filtrarlos por categoría, agregarlos
            al carrito y simular una reserva deportiva.
          </p>
        </Card>

        <Card titulo="¿Cómo funciona el carrito?">
          <p>
            Podés agregar productos, modificar sus cantidades,
            eliminarlos y confirmar un pedido.
          </p>

          <p>
            Para confirmar una compra solamente es obligatorio
            ingresar tu nombre.
          </p>
        </Card>

        <Card titulo="¿Las compras y reservas son reales?">
          <p>
            No. SportZone es un proyecto académico y las operaciones
            se realizan de manera simulada.
          </p>
        </Card>

        <Card titulo="Tecnologías utilizadas">
          <p>
            React, Vite, JavaScript, React Router, SASS,
            JSON Server y localStorage.
          </p>
        </Card>
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
