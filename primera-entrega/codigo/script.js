const productos = [
  { id: 1, nombre: "Pelota de fútbol", categoria: "futbol", precio: 8900 },
  { id: 2, nombre: "Botines Nike", categoria: "futbol", precio: 32000 },
  { id: 3, nombre: "Camiseta Argentina", categoria: "futbol", precio: 12500 },
  { id: 4, nombre: "Pala de pádel", categoria: "padel", precio: 28000 },
  { id: 5, nombre: "Pelotas de pádel x3", categoria: "padel", precio: 1800 },
  { id: 6, nombre: "Pelota de básquet", categoria: "basket", precio: 9500 },
  { id: 7, nombre: "Zapatillas de básquet", categoria: "basket", precio: 45000 },
  { id: 8, nombre: "Raqueta de tenis", categoria: "tenis", precio: 38000 },
  { id: 9, nombre: "Pelotas de tenis x4", categoria: "tenis", precio: 1200 },
  { id: 10, nombre: "Pelota de vóley", categoria: "voley", precio: 11000 },
  { id: 11, nombre: "Rodilleras", categoria: "voley", precio: 4200 },
];

const canchas = [
  { id: 1, nombre: "Fútbol 5", tipo: "futbol", precio: 3500, horarios: ["09:00", "11:00", "14:00", "16:00", "20:00"] },
  { id: 2, nombre: "Pádel 1", tipo: "padel", precio: 2800, horarios: ["08:00", "10:00", "12:00", "15:00", "18:00"] },
  { id: 3, nombre: "Pádel 2", tipo: "padel", precio: 2800, horarios: ["09:00", "11:00", "13:00", "17:00", "19:00"] },
  { id: 4, nombre: "Tenis", tipo: "tenis", precio: 2200, horarios: ["08:00", "10:00", "14:00", "16:00", "18:00"] },
  { id: 5, nombre: "Básquet", tipo: "basket", precio: 3000, horarios: ["10:00", "13:00", "16:00", "19:00", "21:00"] },
];

/**
 * Convierte un valor numérico a un precio expresado en pesos argentinos.
 * @param {number} valor - Importe a formatear.
 * @returns {string} Precio con separadores de miles.
 */
const pesos = (valor) => "$" + valor.toLocaleString("es-AR");

/**
 * Obtiene los artículos guardados en el navegador.
 * @returns {Array<object>} Ítems del carrito, o un arreglo vacío.
 */
const leerCarrito = () => {
  try {
    const datos = JSON.parse(localStorage.getItem("carrito") || "[]");
    return Array.isArray(datos) ? datos : [];
  } catch {
    return [];
  }
};

/**
 * Guarda el estado actual del carrito.
 * @param {Array<object>} carrito - Ítems que se deben almacenar.
 * @returns {void}
 */
const guardarCarrito = (carrito) => {
  localStorage.setItem("carrito", JSON.stringify(carrito));
};

/**
 * Agrega una unidad del producto elegido al carrito.
 * @param {number} id - Identificador del producto.
 * @returns {void}
 */
const agregarCarrito = (id) => {
  if (!productos.some((p) => p.id === id)) return;
  const carrito = leerCarrito();
  const item = carrito.find((x) => x.tipo === "producto" && x.id === id);
  if (item) item.cantidad++;
  else carrito.push({ tipo: "producto", id, cantidad: 1 });
  guardarCarrito(carrito);
  mostrarCarrito();
};

/**
 * Aumenta o disminuye las unidades de un producto.
 * @param {number} id - Identificador del producto.
 * @param {number} cambio - Variación de unidades (positiva o negativa).
 * @returns {void}
 */
const cambiarCantidad = (id, cambio) => {
  const carrito = leerCarrito();
  const item = carrito.find((x) => x.tipo === "producto" && x.id === id);
  if (!item) return;
  item.cantidad += cambio;
  if (item.cantidad <= 0) carrito.splice(carrito.indexOf(item), 1);
  guardarCarrito(carrito);
  mostrarCarrito();
};

/**
 * Elimina un ítem del carrito por su posición.
 * @param {number} indice - Posición del ítem.
 * @returns {void}
 */
const eliminarItem = (indice) => {
  const carrito = leerCarrito();
  if (indice < 0 || indice >= carrito.length) return;
  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  mostrarCarrito();
};

/**
 * Elimina todos los ítems almacenados.
 * @returns {void}
 */
const vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  mostrarCarrito();
};

/**
 * Actualiza los productos, reservas y totales visibles en la página.
 * @returns {void}
 */
const mostrarCarrito = () => {
  const carrito = leerCarrito();
  const caja = document.getElementById("carrito");
  let total = 0;
  let cantidad = 0;
  let html = "";

  carrito.forEach((item, indice) => {
    if (item.tipo === "producto") {
      const p = productos.find((x) => x.id === item.id);
      if (!p) return;
      const unidades = Number(item.cantidad) || 0;
      const subtotal = p.precio * unidades;
      total += subtotal;
      cantidad += unidades;
      html += `<div class="item-carrito"><strong>${p.nombre}</strong><p>${pesos(p.precio)} x ${unidades} = ${pesos(subtotal)}</p><button type="button" onclick="cambiarCantidad(${p.id},-1)">-</button> <button type="button" onclick="cambiarCantidad(${p.id},1)">+</button> <button type="button" onclick="eliminarItem(${indice})">Eliminar</button></div>`;
    } else if (item.tipo === "reserva") {
      total += Number(item.precio) || 0;
      cantidad++;
      html += `<div class="item-carrito"><strong>Reserva: ${item.cancha}</strong><p>Fecha: ${item.fecha} - Hora: ${item.hora} - Personas: ${item.personas}</p><p>${pesos(Number(item.precio) || 0)}</p><button type="button" onclick="eliminarItem(${indice})">Cancelar reserva</button></div>`;
    }
  });

  if (caja) {
    caja.innerHTML = cantidad > 0
      ? html + `<hr><h3>Total: ${pesos(total)}</h3><div class="acciones-carrito"><button class="boton" type="button" onclick="vaciarCarrito()">Vaciar carrito</button><button class="boton" type="button" onclick="procesarCompra()">Comprar</button></div>`
      : "<p>El carrito está vacío.</p>";
  }
  document.querySelectorAll(".nav-contador").forEach((e) => { e.textContent = cantidad; });
};

/**
 * Aplica los filtros de búsqueda y categoría al catálogo.
 * @returns {void}
 */
const filtrarProductos = () => {
  const cat = document.getElementById("filtro");
  const bus = document.getElementById("busqueda");
  if (!cat || !bus) return;
  const texto = bus.value.toLowerCase().trim();
  document.querySelectorAll(".producto").forEach((card) => {
    const okCat = cat.value === "todos" || card.dataset.categoria === cat.value ||
      (cat.value === "otros" && ["basket", "tenis", "voley"].includes(card.dataset.categoria));
    const okTexto = (card.dataset.nombre || "").includes(texto);
    card.classList.toggle("oculto", !(okCat && okTexto));
  });
};

/**
 * Carga los horarios según la cancha seleccionada.
 * @returns {void}
 */
const cargarHorarios = () => {
  const select = document.getElementById("cancha");
  const hora = document.getElementById("hora");
  if (!select || !hora) return;
  const cancha = canchas.find((x) => x.id === Number(select.value));
  hora.innerHTML = '<option value="">Elegir horario</option>';
  if (cancha) cancha.horarios.forEach((h) => {
    hora.add(new Option(h, h));
  });
};

/**
 * Valida y añade una reserva simulada al carrito.
 * @param {SubmitEvent} evento - Evento de envío del formulario.
 * @returns {void}
 */
const reservar = (evento) => {
  evento.preventDefault();
  const fecha = document.getElementById("fecha").value;
  const cancha = canchas.find((x) => x.id === Number(document.getElementById("cancha").value));
  const hora = document.getElementById("hora").value;
  const personas = Number(document.getElementById("personas").value);
  const mensaje = document.getElementById("mensaje-reserva");
  const hoy = new Date();
  const fechaLocal = `${hoy.getFullYear()}-${String(hoy.getMonth() + 1).padStart(2, "0")}-${String(hoy.getDate()).padStart(2, "0")}`;

  if (!cancha || !fecha || !cancha.horarios.includes(hora) || !Number.isInteger(personas) || personas < 1 || personas > 20 || fecha < fechaLocal) {
    mensaje.textContent = "Revisá los datos de la reserva.";
    return;
  }
  const carrito = leerCarrito();
  carrito.push({ tipo: "reserva", cancha: cancha.nombre, fecha, hora, personas, precio: cancha.precio });
  guardarCarrito(carrito);
  mensaje.textContent = "Cancha reservada y agregada al carrito.";
  mostrarCarrito();
  evento.target.reset();
  cargarHorarios();
};

/**
 * Oculta el resumen y abre el formulario del pedido.
 * @returns {void}
 */
const procesarCompra = () => {
  if (!leerCarrito().length) {
    alert("El carrito está vacío.");
    return;
  }
  document.querySelector(".carrito-pagina")?.classList.add("oculto");
  document.getElementById("formulario-checkout")?.classList.remove("oculto");
  document.getElementById("checkout-nombre")?.focus();
};

/**
 * Permite volver desde el checkout al carrito sin perder los productos.
 * @returns {void}
 */
const volverCarrito = () => {
  document.querySelector(".carrito-pagina")?.classList.remove("oculto");
  document.getElementById("formulario-checkout")?.classList.add("oculto");
};

/**
 * Valida el nombre y registra un pedido simulado en el navegador.
 * El teléfono, la forma de entrega y la forma de pago son opcionales.
 * @param {SubmitEvent} evento - Evento de envío del checkout.
 * @returns {void}
 */
const probarFormulario = (evento) => {
  evento.preventDefault();
  const nombreInput = document.getElementById("checkout-nombre");
  const mensaje = document.getElementById("mensaje-checkout");
  const nombre = nombreInput.value.trim();
  if (!nombre) {
    mensaje.textContent = "Por favor, ingresá tu nombre para hacer el pedido.";
    nombreInput.focus();
    return;
  }
  const carrito = leerCarrito();
  if (!carrito.length) {
    mensaje.textContent = "No se puede confirmar un carrito vacío.";
    return;
  }
  const pedido = {
    nombre,
    telefono: document.getElementById("checkout-telefono").value.trim(),
    entrega: document.querySelector('input[name="checkout-entrega"]:checked')?.value || "Sin especificar",
    pago: document.querySelector('input[name="checkout-pago"]:checked')?.value || "Sin especificar",
    items: carrito,
    fecha: new Date().toISOString(),
  };
  // Simulación académica: no se envían datos a un servidor.
  console.info("Pedido simulado confirmado:", pedido);
  guardarCarrito([]);
  mostrarCarrito();
  evento.target.reset();
  volverCarrito();
  alert(`¡Pedido registrado con éxito, ${nombre}! Nos contactaremos para coordinar los detalles.`);
};

/**
 * Inicializa los filtros, el carrito y los eventos de checkout.
 * @returns {void}
 */
const inicializarPagina = () => {
  mostrarCarrito();
  const params = new URLSearchParams(location.search);
  const categoria = params.get("categoria");
  const busqueda = params.get("busqueda");
  if (categoria && document.getElementById("filtro")) {
    document.getElementById("filtro").value = categoria;
    filtrarProductos();
  }
  if (busqueda && document.getElementById("busqueda")) {
    document.getElementById("busqueda").value = busqueda;
    filtrarProductos();
  }
  document.getElementById("checkout-form")?.addEventListener("submit", probarFormulario);
  document.getElementById("volver-carrito")?.addEventListener("click", volverCarrito);
};
window.addEventListener("DOMContentLoaded", inicializarPagina);
