
import { Link, useNavigate } from 'react-router-dom'

function Header({ cantidadCarrito }) {
  const navigate = useNavigate()

  return (
    <header>
      <div className="header">
        <h1 className="logo">
          <button
            type="button"
            className="logo-boton"
            onClick={() => navigate('/')}
          >
            SportZone
          </button>
        </h1>

        <nav aria-label="Navegación principal">
          <Link to="/">Inicio</Link>
          <Link to="/productos">Productos</Link>
          <Link to="/canchas">Canchas</Link>
          <Link to="/info">Info</Link>
          <Link to="/contacto">Contacto</Link>
          <Link to="/carrito">
            🛒 Carrito ({cantidadCarrito})
          </Link>
        </nav>
      </div>
    </header>
  )
}

export default Header
