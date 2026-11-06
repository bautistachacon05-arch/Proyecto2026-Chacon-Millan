
import { Link } from 'react-router-dom'
import hero from '@/assets/hero.png'

/**
 * Página principal de SportZone.
 * @returns {JSX.Element} Contenido de inicio.
 */
function Inicio() {
  return (
    <>
      <section className="hero">
        <div>
          <h2>Todo para practicar tu deporte</h2>

          <p>
            Somos un catálogo de productos deportivos y canchas.
            Este sitio forma parte de un proyecto académico.
          </p>

          <Link className="boton" to="/productos">
            Ver productos
          </Link>
        </div>

        <img
          className="hero-imagen"
          src={hero}
          alt="Imagen principal de SportZone"
        />
      </section>

      <section className="titulo">
        <h2>Categorías</h2>

        <div className="grid">
          <article className="card">
            <h3>Fútbol</h3>
            <p>Pelotas, botines y camisetas.</p>
          </article>

          <article className="card">
            <h3>Pádel</h3>
            <p>Palas y pelotas para jugar.</p>
          </article>

          <article className="card">
            <h3>Otros</h3>
            <p>Básquet, tenis y vóley.</p>
          </article>
        </div>
      </section>
    </>
  )
}

export default Inicio
