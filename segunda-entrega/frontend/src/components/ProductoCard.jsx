
function ProductoCard({ producto, onAgregar }) {
  return (
    <article className="card producto">
      <img
        src={`/imagenes/${producto.imagen}`}
        alt={producto.nombre}
      />

      <h3>{producto.nombre}</h3>

      <p className="precio">
        ${producto.precio.toLocaleString('es-AR')}
      </p>

      <button
        className="boton"
        type="button"
        onClick={() => onAgregar(producto)}
      >
        Agregar al carrito
      </button>
    </article>
  )
}

export default ProductoCard
