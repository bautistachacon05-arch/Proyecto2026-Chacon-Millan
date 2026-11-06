
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Inicio from '@/pages/Inicio'
import Productos from '@/pages/Productos'
import Carrito from '@/pages/Carrito'
import Canchas from '@/pages/Canchas'
import Info from '@/pages/Info'
import Contacto from '@/pages/Contacto'

import '@/styles/main.scss'

/**
 * Diseño compartido por las páginas.
 */
function Layout({ cantidadCarrito }) {
  return (
    <>
      <Header cantidadCarrito={cantidadCarrito} />
      <main>
        <Outlet />
      </main>
      <Footer />
    </>
  )
}

/**
 * Aplicación principal de SportZone.
 */
function App() {
  const [carrito, setCarrito] = useState(() => {
    try {
      const guardado = JSON.parse(
        localStorage.getItem('carritoSportZone') || '[]'
      )

      return Array.isArray(guardado) ? guardado : []
    } catch {
      return []
    }
  })

  // Guarda el carrito cuando cambia.
  useEffect(() => {
    localStorage.setItem(
      'carritoSportZone',
      JSON.stringify(carrito)
    )
  }, [carrito])

  /**
   * Agrega un producto o aumenta su cantidad.
   */
  const agregarProducto = (producto) => {
    setCarrito((anterior) => {
      const idProducto = `producto-${producto.id}`

      const existe = anterior.find(
        (item) =>
          item.tipo !== 'reserva' &&
          String(item.id) === idProducto
      )

      if (existe) {
        return anterior.map((item) =>
          item.tipo !== 'reserva' &&
          String(item.id) === idProducto
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      // Separamos los IDs de productos y reservas.
      return [
        ...anterior,
        {
          ...producto,
          id: idProducto,
          tipo: 'producto',
          cantidad: 1
        }
      ]
    })
  }

  /**
   * Agrega una reserva individual al carrito.
   */
  const agregarReserva = (reserva) => {
    setCarrito((anterior) => [
      ...anterior,
      {
        ...reserva,
        id: `reserva-${crypto.randomUUID()}`,
        tipo: 'reserva',
        cantidad: 1
      }
    ])
  }

  /**
   * Modifica cantidades de productos.
   * Las reservas no permiten modificar la cantidad.
   */
  const cambiarCantidad = (id, cambio) => {
    setCarrito((anterior) =>
      anterior
        .map((item) => {
          if (
            String(item.id) !== String(id) ||
            item.tipo === 'reserva'
          ) {
            return item
          }

          return {
            ...item,
            cantidad: item.cantidad + cambio
          }
        })
        .filter((item) => item.cantidad > 0)
    )
  }

  /**
   * Elimina un producto o una reserva.
   */
  const eliminarProducto = (id) => {
    setCarrito((anterior) =>
      anterior.filter(
        (item) => String(item.id) !== String(id)
      )
    )
  }

  /**
   * Elimina todos los elementos del carrito.
   */
  const vaciarCarrito = () => {
    setCarrito([])
  }

  const cantidadCarrito = carrito.reduce(
    (total, item) => total + item.cantidad,
    0
  )

  return (
    <BrowserRouter>
      <Routes>
        <Route
          element={
            <Layout cantidadCarrito={cantidadCarrito} />
          }
        >
          <Route
            path="/"
            element={<Inicio />}
          />

          <Route
            path="/productos"
            element={
              <Productos onAgregar={agregarProducto} />
            }
          />

          <Route
            path="/canchas"
            element={
              <Canchas onAgregarReserva={agregarReserva} />
            }
          />

          <Route
            path="/carrito"
            element={
              <Carrito
                carrito={carrito}
                cambiarCantidad={cambiarCantidad}
                eliminarProducto={eliminarProducto}
                vaciarCarrito={vaciarCarrito}
              />
            }
          />

          <Route
            path="/info"
            element={<Info />}
          />

          <Route
            path="/contacto"
            element={<Contacto />}
          />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
