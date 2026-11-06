
/**
 * Muestra la información de contacto de SportZone.
 * @returns {JSX.Element} Página de contacto.
 */
function Contacto() {
  return (
    <section className="pagina-contacto">
      <h2>Contacto</h2>

      <p>
        Si tenés alguna consulta sobre SportZone,
        podés encontrar nuestros datos de contacto a continuación.
      </p>

      <div className="contacto">
        <article className="caja">
          <h3>WhatsApp</h3>

          <p>+54 9 351 555 2026</p>
        </article>

        <article className="caja">
          <h3>Correo electrónico</h3>

          <p>sportzone@ejemplo.com</p>
        </article>
      </div>

      <p className="aviso-contacto">
        SportZone es un proyecto académico.
        Los datos de contacto son ilustrativos.
      </p>
    </section>
  )
}

export default Contacto
