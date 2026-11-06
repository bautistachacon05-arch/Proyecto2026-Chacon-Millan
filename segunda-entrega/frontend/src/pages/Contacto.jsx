
import Card from '@/components/Card'

/**
 * Muestra la información de contacto de SportZone.
 * @returns {React.ReactElement} Página de contacto.
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
        <Card titulo="WhatsApp">
          <p>+54 9 351 555 2026</p>
        </Card>

        <Card titulo="Correo electrónico">
          <p>sportzone@ejemplo.com</p>
        </Card>
      </div>

      <p className="aviso-contacto">
        SportZone es un proyecto académico.
        Los datos de contacto son ilustrativos.
      </p>
    </section>
  )
}

export default Contacto
