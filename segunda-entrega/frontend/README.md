
# SportZone - Segunda Entrega

## Descripción del proyecto

SportZone es una aplicación web desarrollada para la materia de Desarrollo Web.

El proyecto consiste en una tienda de artículos deportivos que también permite consultar y realizar reservas simuladas de canchas.

Esta segunda entrega migra el proyecto original de HTML, CSS y JavaScript a React, incorporando componentes reutilizables, navegación entre páginas, manejo de estados, almacenamiento local y consumo de una API simulada.

**Importante:** SportZone es un proyecto académico. Las compras y reservas son simuladas y no generan transacciones reales.

## Tecnologías utilizadas

- HTML5
- JavaScript
- React
- Vite
- React Router DOM
- React Hooks
- SASS / SCSS
- JSON Server
- Fetch API
- localStorage
- ESLint
- Git y GitHub

## Funcionalidades

### Inicio

- Presentación de SportZone.
- Acceso al catálogo de productos.
- Visualización de categorías deportivas.

### Productos

- Visualización de productos deportivos.
- Obtención de productos desde una API simulada.
- Búsqueda de productos por nombre.
- Filtrado por categoría.
- Incorporación de productos al carrito.
- Mensajes de carga y error.

### Canchas

- Visualización de canchas deportivas.
- Consulta de precios y horarios.
- Selección de cancha, fecha, horario y cantidad de personas.
- Validación de los datos ingresados.
- Incorporación de reservas al carrito.
- Navegación al carrito después de agregar una reserva.

### Carrito

- Visualización de productos y reservas.
- Modificación de cantidades de productos.
- Eliminación de productos y reservas.
- Cálculo automático de subtotales y total.
- Persistencia mediante localStorage.
- Formulario para confirmar pedidos simulados.
- Validación del nombre obligatorio.
- Vaciado del carrito después de confirmar un pedido.

### Información y Contacto

- Información general sobre SportZone.
- Descripción de las funcionalidades.
- Visualización de datos de contacto ilustrativos.

## Requisitos previos

Para ejecutar el proyecto es necesario tener instalado:

- Node.js
- npm
- Git (para clonar el repositorio)

Se recomienda utilizar una versión reciente de Node.js compatible con la versión de Vite instalada.

## Instalación

### 1. Clonar el repositorio

```bash
git clone https://github.com/bautistachacon05-arch/Proyecto2026-Chacon-Millan.git
```

### 2. Ingresar a la rama de trabajo

```bash
cd Proyecto2026-Chacon-Millan
git switch rama-Bauti
```

### 3. Entrar a la carpeta del frontend

```bash
cd segunda-entrega/frontend
```

### 4. Instalar dependencias

```bash
npm install
```

En Windows PowerShell, si la ejecución de npm está restringida, se puede utilizar:

```powershell
npm.cmd install
```

## Ejecución del proyecto

Para que el catálogo funcione correctamente, se deben ejecutar dos procesos: JSON Server y Vite.

### Terminal 1: iniciar la API simulada

Desde la carpeta `segunda-entrega/frontend`, ejecutar:

```bash
npm run mock
```

En Windows PowerShell:

```powershell
npm.cmd run mock
```

El servicio estará disponible en:

http://localhost:3001

El endpoint de productos será:

http://localhost:3001/productos

### Terminal 2: iniciar React con Vite

Abrir una segunda terminal en la misma carpeta y ejecutar:

```bash
npm run dev
```

En Windows PowerShell:

```powershell
npm.cmd run dev
```

La aplicación estará disponible normalmente en:

http://localhost:5173

Si el puerto está ocupado, Vite puede asignar otro. Consultar la dirección indicada en la terminal.

**Nota:** ambas terminales deben permanecer ejecutándose mientras se utiliza la aplicación.

## Rutas de la aplicación

| Ruta | Descripción |
|---|---|
| `/` | Página de inicio |
| `/productos` | Catálogo de productos |
| `/canchas` | Consulta y reserva de canchas |
| `/carrito` | Productos y reservas agregados |
| `/info` | Información de SportZone |
| `/contacto` | Datos de contacto |

La navegación se implementa con React Router DOM.

Se utiliza un componente de diseño compartido con `Header`, `Footer` y `Outlet` para mostrar las distintas páginas.

## Estructura del proyecto

```text
frontend/
├── public/
│   └── imagenes/
├── src/
│   ├── api/
│   │   └── productos.js
│   ├── assets/
│   ├── components/
│   │   ├── Header.jsx
│   │   ├── Footer.jsx
│   │   └── ProductoCard.jsx
│   ├── pages/
│   │   ├── Inicio.jsx
│   │   ├── Productos.jsx
│   │   ├── Canchas.jsx
│   │   ├── Carrito.jsx
│   │   ├── Info.jsx
│   │   └── Contacto.jsx
│   ├── styles/
│   │   └── main.scss
│   ├── App.jsx
│   └── main.jsx
├── db.json
├── package.json
├── package-lock.json
├── vite.config.js
└── README.md
```

## Componentes y Hooks

### Componentes

La aplicación está dividida en componentes y páginas para facilitar el mantenimiento.

El componente `ProductoCard` permite representar los artículos del catálogo sin repetir su estructura.

`Header` y `Footer` se utilizan dentro del diseño general de la aplicación.

### Hooks utilizados

- `useState`: almacena productos, filtros, carrito, formularios y mensajes de validación.
- `useEffect`: carga productos desde la API y guarda cambios del carrito en localStorage.
- `useNavigate`: permite navegar entre páginas mediante acciones del usuario.

## API simulada

Se utiliza JSON Server para simular un servicio de productos.

Los datos se encuentran en el archivo `db.json`.

La aplicación realiza una solicitud GET a:

```text
http://localhost:3001/productos
```

La consulta está implementada mediante Fetch API y funciones asíncronas con `async` y `await`.

El archivo `src/api/productos.js` centraliza el acceso al servicio.

Si JSON Server no está ejecutándose, la página de productos mostrará un mensaje de error.

## Almacenamiento local

Se utiliza `localStorage` para mantener el contenido del carrito aunque el usuario actualice la página.

La clave utilizada es:

```text
carritoSportZone
```

El carrito permite almacenar tanto productos como reservas de canchas.

Los pedidos se procesan de manera simulada y no se registran en un servicio externo.

## Validaciones

Se implementan validaciones de formularios para mejorar la experiencia del usuario.

### Reservas

- Selección obligatoria de cancha.
- Fecha obligatoria y no anterior a la actual.
- Horario válido para la cancha seleccionada.
- Cantidad de personas entre 1 y 20.
- Mensajes de error asociados a los campos.

### Carrito

- Nombre obligatorio para confirmar un pedido.
- Verificación de que existan elementos en el carrito.
- Campos opcionales para teléfono, entrega y forma de pago.

Los formularios emplean eventos `onChange`, estados de React y atributos de accesibilidad.

## Estilos

Se utiliza SASS con archivos `.scss`.

Los estilos de la aplicación se encuentran en:

```text
src/styles/main.scss
```

Se incluyen variables, reglas anidadas, grillas y estilos responsive para distintos tamaños de pantalla.

Los estilos se importan mediante el alias `@/`.

## Comandos disponibles

| Comando | Función |
|---|---|
| `npm run dev` | Iniciar Vite en desarrollo |
| `npm run mock` | Iniciar JSON Server en el puerto 3001 |
| `npm run build` | Generar la versión de producción |
| `npm run preview` | Previsualizar la versión compilada |
| `npm run lint` | Analizar el código con ESLint |
| `npm audit` | Revisar vulnerabilidades de dependencias |

En Windows PowerShell se puede reemplazar `npm` por `npm.cmd`.

## Verificación del proyecto

Antes de entregar se recomienda ejecutar:

```bash
npm run build
npm run lint
npm audit
```

También se deben comprobar manualmente las rutas, la navegación, los filtros, las validaciones y el funcionamiento del carrito.



### Dependencias y seguridad

Se ejecutó `npm audit` para verificar las dependencias
del proyecto.

Resultado final:

- Vulnerabilidades críticas: 0.
- Vulnerabilidades altas: 0.
- Vulnerabilidades moderadas: 0.
- Vulnerabilidades bajas: 0.

Se detectó previamente una vulnerabilidad en la
dependencia transitiva `minimatch`, utilizada por ESLint.

Para resolverla se agregó un override en `package.json`
que utiliza `minimatch` en su versión 11.0.1 o superior,
sin modificar la versión principal de ESLint.

Después de aplicar el cambio se verificó:

- `npm audit`: 0 vulnerabilidades.
- `npm run lint`: sin errores.
- `npm run build`: compilación correcta.

La configuración de seguridad se encuentra registrada
en `package.json` y `package-lock.json`.



## Control de versiones

El proyecto utiliza Git y GitHub.

Se emplean mensajes de commit siguiendo la convención Conventional Commits.

Ejemplos:

```text
feat: agrega reservas de canchas con validaciones
feat: integra reservas de canchas al carrito
feat: agrega paginas de informacion y contacto
refactor: configura alias para imports del proyecto
```

## Repositorio

Repositorio del proyecto:

https://github.com/bautistachacon05-arch/Proyecto2026-Chacon-Millan

Rama de trabajo utilizada:

`rama-Bauti`

## Estado del proyecto

Segunda entrega desarrollada con React y Vite.

El proyecto incluye catálogo deportivo, reservas simuladas, navegación entre páginas, carrito persistente, consumo de una API simulada y formularios con validaciones.

Antes de la entrega definitiva se deben completar las comprobaciones de requisitos y las pruebas finales.
