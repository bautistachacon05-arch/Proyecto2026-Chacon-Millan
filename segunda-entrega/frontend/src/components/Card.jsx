
/**
 * Componente genérico reutilizable para mostrar tarjetas.
 *
 * @param {object} props - Propiedades del componente.
 * @param {string} props.titulo - Título de la tarjeta.
 * @param {React.ReactNode} props.children - Contenido de la tarjeta.
 * @returns {React.ReactElement} Tarjeta.
 */
function Card({ titulo, children }) {
  return (
    <article className="caja">
      <h3>{titulo}</h3>
      {children}
    </article>
  )
}

export default Card
