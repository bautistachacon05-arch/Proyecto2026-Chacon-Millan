
import { useNavigate } from 'react-router-dom'

function Header() {
  const navigate = useNavigate()

  return (
    <header>
      <div className="header">
        <h1 className="logo" onClick={() => navigate('/')}>
          SportZone
        </h1>

        <nav aria-label="Navegación principal">
          <a href="/">Inicio</a>
          <a href="/productos">Productos</a>
          <a href="/canchas">Canchas</a>
          <a href="/info">Info</a>
          <a href="/contacto">Contacto</a>
          <a href="/carrito">🛒 Carrito</a>
        </nav>
      </div>
    </header>
  )
}

export default Header
