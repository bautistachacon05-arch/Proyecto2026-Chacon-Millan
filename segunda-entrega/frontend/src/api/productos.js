
const API_URL = 'http://localhost:3001/productos'

/**
 * Obtiene los productos del servidor simulado.
 * @param {AbortSignal} signal - Señal opcional para cancelar la petición.
 * @returns {Promise<Array<object>>} Lista de productos.
 */
export const obtenerProductos = async (signal) => {
  const respuesta = await fetch(API_URL, { signal })

  if (!respuesta.ok) {
    throw new Error('No se pudieron obtener los productos')
  }

  const datos = await respuesta.json()

  if (!Array.isArray(datos)) {
    throw new Error('El formato de los productos es incorrecto')
  }

  return datos
}
