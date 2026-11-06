# SportZone

Proyecto académico de catálogo de artículos deportivos y reserva simulada de canchas.

## Índice

- [Autores](#autores)
- [Sitio web](#sitio-web)
- [Funcionalidades](#funcionalidades)
- [Tecnologías](#tecnologías)
- [Estructura de archivos](#estructura-de-archivos)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Pruebas manuales](#pruebas-manuales)
- [Convención de commits](#convención-de-commits)
- [Sketches y wireframes](#sketches-y-wireframes)

## Autores

- Bautista Chacon
- Geronimo Millan

## Sitio web

[Visitar SportZone en GitHub Pages](https://bautistachacon05-arch.github.io/Proyecto2026-Chacon-Millan/)

> El enlace depende de que GitHub Pages esté configurado para publicar la carpeta correspondiente. Si la publicación apunta a otra ruta, actualizar la URL.

## Funcionalidades

| Página | Funcionalidad |
| --- | --- |
| [Inicio](index.html) | Presentación del sitio y categorías |
| [Productos](productos.html) | Filtro, búsqueda y agregado al carrito |
| [Canchas](canchas.html) | Consulta y reserva simulada de horarios |
| [Carrito](carrito.html) | Cantidades, total y confirmación de pedidos |
| [Información](info.html) | Descripción y preguntas sobre el proyecto |
| [Contacto](contacto.html) | Datos de contacto |

## Tecnologías

HTML5 semántico, CSS3, JavaScript ES6, Google Fonts, Git y GitHub Pages.

## Estructura de archivos

- `index.html`: página principal.
- `productos.html`: catálogo.
- `canchas.html`: reservas.
- `carrito.html`: carrito y formulario de pedido.
- `info.html`: información general.
- `contacto.html`: datos de contacto.
- `styles.css`: hoja de estilos externa.
- `script.js`: interacciones, validaciones y carrito.
- `imagenes/`: recursos visuales.
- `Sketch/` y `Wireframe/`: prototipos de las pantallas.

## Cómo ejecutar el proyecto

Abrir `index.html` en un navegador o servir la carpeta `primera-entrega` con una extensión de servidor local como Live Server.

## Pruebas manuales

1. Filtrar y buscar productos.
2. Agregar artículos, modificar cantidades y vaciar el carrito.
3. Intentar reservar una cancha sin datos y con fecha anterior a hoy.
4. Confirmar un pedido sin nombre: debe mostrar un error de validación.
5. Confirmar un pedido solo con nombre: debe aceptarlo.
6. Confirmar un pedido con teléfono, entrega y pago: también debe aceptarlo.
7. Verificar que el carrito permanezca tras recargar antes de confirmar el pedido.

## Convención de commits

Los próximos commits deben seguir [Conventional Commits](https://www.conventionalcommits.org/es/v1.0.0/):

```text
fix: permite confirmar pedidos solo con nombre
style: reemplaza saltos de línea por márgenes y padding
docs: agrega índice y enlaces al README
refactor: documenta funciones con JSDoc
```

## Sketches y wireframes


