
import { useEffect, useState } from 'react'
import ProductoCard from '../components/ProductoCard'
import { obtenerProductos } from '../api/productos'

function Productos({ onAgregar }) {
  const [productos, setProductos] = useState([])
  const [categoria, setCategoria] = useState('todos')
  const [busqueda, setBusqueda] = useState('')
  const [cargando, setCargando] = useState(true)
  const [error, setError] = useState('')

  useEffect(() => {
    const controlador = new AbortController()

    const cargarProductos = async () => {
      try {
        const datos = await obtenerProductos(controlador.signal)
        setProductos(datos)
      } catch (error) {
        if (error.name !== 'AbortError') {
          setError('No se pudieron cargar los productos.')
        }
      } finally {
        if (!controlador.signal.aborted) {
          setCargando(false)
        }
      }
    }

    cargarProductos()

    return () => controlador.abort()
  }, [])

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

      {cargando && (
        <p role="status">Cargando productos...</p>
      )}

      {error && (
        <p className="mensaje-error" role="alert">
          {error}
        </p>
      )}

      {!cargando && !error && (
        <>
          <div className="grid">
            {productosFiltrados.map((producto) => (
              <ProductoCard
                key={producto.id}
                producto={producto}
                onAgregar={onAgregar}
              />
            ))}
          </div>

          {productosFiltrados.length === 0 && (
            <p>No encontramos productos con esos filtros.</p>
          )}
        </>
      )}
    </section>
  )
}

export default Productos
