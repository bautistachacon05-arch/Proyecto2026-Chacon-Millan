# SportZone — Segunda Entrega

Proyecto académico desarrollado para la materia **Taller de Desarrollo Web** de la Universidad Católica de Córdoba.

**Autores:**
- Bautista Chacon
- Geronimo Millan

## Índice

- [Descripción](#descripción)
- [Funcionalidades](#funcionalidades)
- [Tecnologías utilizadas](#tecnologías-utilizadas)
- [Estructura del proyecto](#estructura-del-proyecto)
- [Instalación](#instalación)
- [Ejecución](#ejecución)
- [Rutas](#rutas)
- [Componentes y Hooks](#componentes-y-hooks)
- [API simulada](#api-simulada)
- [Persistencia y validaciones](#persistencia-y-validaciones)
- [Pruebas y seguridad](#pruebas-y-seguridad)
- [Repositorio](#repositorio)

## Descripción

**SportZone** es una aplicación web dedicada a la venta simulada de productos deportivos y la reserva de canchas.

En esta segunda entrega se migró el proyecto original de HTML, CSS y JavaScript a una aplicación desarrollada con **React y Vite**.

Se incorporaron componentes reutilizables, navegación entre páginas, Hooks, estilos SASS, una API simulada y almacenamiento local.

Las compras y reservas son simuladas. No se realizan transacciones reales.

## Funcionalidades

| Página | Funcionalidades |
|---|---|
| Inicio | Presentación de SportZone, imagen principal y categorías deportivas |
| Productos | Catálogo, búsqueda, filtros y agregado al carrito |
| Canchas | Consulta de canchas, horarios y reservas simuladas |
| Carrito | Productos, reservas, cantidades, subtotales y confirmación de pedidos |
| Información | Descripción y funcionamiento del proyecto |
| Contacto | Datos de contacto ilustrativos |

### Catálogo de productos

- Carga de productos desde una API simulada.
- Búsqueda por nombre.
- Filtros por categoría.
- Tarjetas de productos reutilizables.
- Agregado de artículos al carrito.
- Mensajes de carga y error.

### Reservas de canchas

- Visualización de canchas deportivas.
- Consulta de precios y horarios.
- Selección de fecha, horario y cantidad de personas.
- Validación de campos obligatorios.
- Incorporación de reservas al carrito.

### Carrito de compras

- Agregar y eliminar productos.
- Aumentar y disminuir cantidades.
- Agregar y eliminar reservas.
- Calcular subtotales y total.
- Conservar el carrito al actualizar la página.
- Confirmar pedidos simulados.

Para confirmar un pedido solamente es obligatorio ingresar el nombre. El teléfono, la entrega y la forma de pago son opcionales.

## Tecnologías utilizadas

- **React:** biblioteca para desarrollar interfaces mediante componentes.
- **Vite:** herramienta de desarrollo y compilación.
- **JavaScript:** lógica de la aplicación.
- **React Router DOM:** navegación entre páginas.
- **React Hooks:** gestión de estados, efectos y navegación.
- **SASS / SCSS:** organización de estilos.
- **JSON Server:** simulación de una API REST.
- **Fetch API:** comunicación con la API.
- **localStorage:** almacenamiento del carrito.
- **ESLint:** análisis estático del código.
- **Git y GitHub:** control de versiones.

## Estructura del proyecto

El proyecto está organizado principalmente en las siguientes carpetas:

| Carpeta | Contenido |
|---|---|
| `public/imagenes` | Imágenes públicas de productos y canchas |
| `src/assets` | Recursos importados desde React, incluida la imagen principal |
| `src/components` | Componentes reutilizables |
| `src/pages` | Páginas de la aplicación |
| `src/styles` | Estilos SCSS |
| `src/api` | Funciones de acceso al servicio simulado |

Archivos importantes:

- `src/App.jsx`: rutas, carrito y estado principal.
- `src/components/Card.jsx`: componente genérico reutilizado en Info y Contacto.
- `src/components/ProductoCard.jsx`: tarjetas del catálogo.
- `src/pages/Canchas.jsx`: formulario de reservas.
- `src/pages/Carrito.jsx`: administración del carrito.
- `src/api/productos.js`: consulta de productos.
- `src/styles/main.scss`: estilos generales.
- `db.json`: base de datos simulada.
- `package.json`: dependencias y comandos.
- `vite.config.js`: configuración de Vite y alias.

## Instalación

### Requisitos previos

Tener instalados Node.js y npm, en versiones compatibles con Vite.

### Clonar el repositorio

`git clone https://github.com/bautistachacon05-arch/Proyecto2026-Chacon-Millan.git`

### Seleccionar la rama de desarrollo

`cd Proyecto2026-Chacon-Millan`

`git switch rama-Bauti`

### Ingresar a la aplicación React

`cd segunda-entrega/frontend`

### Instalar dependencias

`npm install`

En Windows PowerShell se puede utilizar `npm.cmd install`.

## Ejecución

Para ejecutar SportZone es necesario mantener abiertos dos procesos.

### Terminal 1 — API simulada

Desde `segunda-entrega/frontend`, ejecutar:

`npm run mock`

Esto inicia JSON Server en el puerto 3001.

Endpoint del catálogo:

http://localhost:3001/productos

### Terminal 2 — Aplicación React

Desde la misma carpeta, ejecutar:

`npm run dev`

Vite mostrará la dirección local de la aplicación.

Normalmente será:

http://localhost:5173

Si ese puerto está ocupado, Vite puede utilizar otro, como `5178`.

**Nota para Windows PowerShell:** se pueden ejecutar `npm.cmd run mock` y `npm.cmd run dev`.

Ambos procesos deben permanecer abiertos para utilizar el catálogo correctamente.

## Rutas

| Ruta | Página |
|---|---|
| `/` | Inicio |
| `/productos` | Productos |
| `/canchas` | Canchas |
| `/carrito` | Carrito |
| `/info` | Información |
| `/contacto` | Contacto |

La navegación utiliza React Router DOM.

El componente principal implementa `Outlet` para mostrar las rutas hijas dentro de un diseño compartido con encabezado y pie de página.

## Componentes y Hooks

### Componentes reutilizables

Se implementó un componente genérico llamado **Card**, utilizado en las páginas Información y Contacto.

También se utiliza `ProductoCard` para representar los artículos del catálogo.

### Hooks utilizados

- **useState:** manejo del carrito, filtros y formularios.
- **useEffect:** consulta de productos y persistencia del carrito.
- **useNavigate:** navegación mediante acciones del usuario.

Los imports del proyecto utilizan el alias `@/`, configurado en Vite.

## API simulada

La aplicación utiliza **JSON Server** con el archivo `db.json`.

Se implementa la operación **GET** para obtener productos desde:

http://localhost:3001/productos

El acceso a los datos se realiza mediante `fetch` y funciones asíncronas con `async` y `await`.

Si el servicio no está disponible, el catálogo muestra un mensaje de error.

## Persistencia y validaciones

### localStorage

El carrito se guarda utilizando la clave:

`carritoSportZone`

Esto permite conservar productos y reservas cuando el usuario actualiza la página.

### Validaciones

El formulario de reservas verifica:

- Selección de cancha.
- Fecha válida.
- Horario válido para la cancha.
- Cantidad de personas entre 1 y 20.

El formulario de compra verifica que el usuario ingrese su nombre.

Se utilizan eventos `onChange`, mensajes de error y atributos de accesibilidad.

## Pruebas y seguridad

### Comandos de verificación

Desde `segunda-entrega/frontend` se pueden ejecutar:

- `npm run lint`: comprueba el código con ESLint.
- `npm run build`: genera la compilación de producción.
- `npm audit`: revisa vulnerabilidades de dependencias.

### Resultado de la auditoría

Se ejecutó `npm audit` y se obtuvo el siguiente resultado:

| Severidad | Vulnerabilidades |
|---|---:|
| Críticas | 0 |
| Altas | 0 |
| Moderadas | 0 |
| Bajas | 0 |

Inicialmente se detectaron vulnerabilidades moderadas asociadas con la dependencia transitiva `minimatch`.

Se agregó un override en `package.json` para utilizar una versión corregida de `minimatch`.

Después del cambio se comprobaron satisfactoriamente `npm audit`, `npm run lint` y `npm run build`.

### Pruebas funcionales

Se realizaron pruebas manuales de:

- Navegación entre páginas.
- Búsqueda y filtros de productos.
- Agregado de productos al carrito.
- Reservas de canchas.
- Modificación y eliminación de elementos.
- Cálculo de totales.
- Persistencia mediante localStorage.
- Validaciones de formularios.
- Confirmación simulada de pedidos.

## Repositorio

**GitHub:** https://github.com/bautistachacon05-arch/Proyecto2026-Chacon-Millan

**Rama de desarrollo:** `rama-Bauti`

Se emplean mensajes de commit siguiendo la convención **Conventional Commits**, utilizando prefijos como `feat:`, `fix:`, `refactor:` y `docs:`.

---

**SportZone — Proyecto académico de Taller de Desarrollo Web.**