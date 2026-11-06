
import { useState } from 'react'
import ProductoCard from '../components/ProductoCard'

const productos = [
  { id: 1, nombre: 'Pelota de fútbol', categoria: 'futbol', precio: 8900, imagen: 'pelota_futbol.jpg' },
  { id: 2, nombre: 'Botines Nike', categoria: 'futbol', precio: 32000, imagen: 'botines.webp' },
  { id: 3, nombre: 'Camiseta Argentina', categoria: 'futbol', precio: 12500, imagen: 'camiseta-belgrano-umbro-alternativa-2026-negro.jpg' },
  { id: 4, nombre: 'Pala de pádel', categoria: 'padel', precio: 28000, imagen: 'paleta_padel.webp' },
  { id: 5, nombre: 'Pelotas de pádel x3', categoria: 'padel', precio: 1800, imagen: 'pelota_tenis_padel.jpg' },
  { id: 6, nombre: 'Pelota de básquet', categoria: 'basket', precio: 9500, imagen: 'pelota_basket.jpg' },
  { id: 7, nombre: 'Zapatillas de básquet', categoria: 'basket', precio: 45000, imagen: 'zapatillas_basket.webp' },
  { id: 8, nombre: 'Raqueta de tenis', categoria: 'tenis', precio: 38000, imagen: 'raqueta_tenis.webp' },
  { id: 9, nombre: 'Pelotas de tenis x4', categoria: 'tenis', precio: 1200, imagen: 'pelota_tenis_padel.jpg' },
  { id: 10, nombre: 'Pelota de vóley', categoria: 'voley', precio: 11000, imagen: 'pelota_voley.avif' },
  { id: 11, nombre: 'Rodilleras', categoria: 'voley', precio: 4200, imagen: 'rodilleras.jpg' }
]

function Productos({ onAgregar }) {
  const [categoria, setCategoria] = useState('todos')
  const [busqueda, setBusqueda] = useState('')

  const productosFiltrados = productos.filter((producto) => {
    const coincideCategoria =
      categoria === 'todos' ||
      producto.categoria === categoria ||
      (categoria === 'otros' &&
        ['basket', 'tenis', 'voley'].includes(producto.categoria))

    const coincideBusqueda = producto.nombre
      .toLowerCase()
      .includes(busqueda.toLowerCase().trim())

    return coincideCategoria && coincideBusqueda
  })

  const agregarProducto = (producto) => {
  onAgregar(producto)
}
  return (
    <section>
      <h2>Productos</h2>
      <p>Buscá y filtrá productos de nuestro catálogo.</p>

      <div className="filtros">
        <div className="control">
          <label htmlFor="filtro">Categoría</label>
          <select
            id="filtro"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
          >
            <option value="todos">Todas</option>
            <option value="futbol">Fútbol</option>
            <option value="padel">Pádel</option>
            <option value="basket">Básquet</option>
            <option value="tenis">Tenis</option>
            <option value="voley">Vóley</option>
            <option value="otros">Otros</option>
          </select>
        </div>

        <div className="control">
          <label htmlFor="busqueda">Buscar</label>
          <input
            id="busqueda"
            type="search"
            placeholder="Ej. pelota"
            value={busqueda}
            onChange={(e) => setBusqueda(e.target.value)}
          />
        </div>
      </div>

      <div className="grid">
        {productosFiltrados.map((producto) => (
          <ProductoCard
            key={producto.id}
            producto={producto}
            onAgregar={agregarProducto}
          />
        ))}
      </div>

      {productosFiltrados.length === 0 && (
        <p>No encontramos productos con esos filtros.</p>
      )}
    </section>
  )
}

export default Productos
