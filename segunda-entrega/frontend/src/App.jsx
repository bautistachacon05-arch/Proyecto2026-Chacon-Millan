
import Canchas from '@/pages/Canchas'
import { useEffect, useState } from 'react'
import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom'

import Header from '@/components/Header'
import Footer from '@/components/Footer'
import Inicio from '@/pages/Inicio'
import Productos from '@/pages/Productos'
import Carrito from '@/pages/Carrito'

import '@/styles/main.scss'

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

  useEffect(() => {
    localStorage.setItem(
      'carritoSportZone',
      JSON.stringify(carrito)
    )
  }, [carrito])

  const agregarProducto = (producto) => {
    setCarrito((anterior) => {
      const existe = anterior.find(
        (item) => String(item.id) === String(producto.id)
      )

      if (existe) {
        return anterior.map((item) =>
          item.id === producto.id
            ? { ...item, cantidad: item.cantidad + 1 }
            : item
        )
      }

      return [...anterior, { ...producto, cantidad: 1 }]
    })
  }

  
const cambiarCantidad = (id, cambio) => {
  setCarrito((anterior) =>
    anterior
      .map((item) =>
        String(item.id) === String(id)
          ? { ...item, cantidad: item.cantidad + cambio }
          : item
      )
      .filter((item) => item.cantidad > 0)
  )
}

const eliminarProducto = (id) => {
  setCarrito((anterior) =>
    anterior.filter((item) => String(item.id) !== String(id))
  )
}


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
          <Route path="/" element={<Inicio />} />

          <Route
            path="/productos"
            element={
              <Productos onAgregar={agregarProducto} />

            
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
          <Route path="/canchas" element={<Canchas />} />
        </Route>
      </Routes>
    </BrowserRouter>
  )
}

export default App
