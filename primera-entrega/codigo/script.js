const productos = [
  {
    id: 1,
    nombre: "Pelota de fútbol",
    categoria: "futbol",
    precio: 8900,
    imagen: "pelota-futbol.svg",
  },
  {
    id: 2,
    nombre: "Botines Nike",
    categoria: "futbol",
    precio: 32000,
    imagen: "botines.svg",
  },
  {
    id: 3,
    nombre: "Camiseta Argentina",
    categoria: "futbol",
    precio: 12500,
    imagen: "camiseta.svg",
  },
  {
    id: 4,
    nombre: "Pala de pádel",
    categoria: "padel",
    precio: 28000,
    imagen: "pala-padel.svg",
  },
  {
    id: 5,
    nombre: "Pelotas de pádel x3",
    categoria: "padel",
    precio: 1800,
    imagen: "pelotas-padel.svg",
  },
  {
    id: 6,
    nombre: "Pelota de básquet",
    categoria: "basket",
    precio: 9500,
    imagen: "pelota-basket.svg",
  },
  {
    id: 7,
    nombre: "Zapatillas de básquet",
    categoria: "basket",
    precio: 45000,
    imagen: "zapatillas-basket.svg",
  },
  {
    id: 8,
    nombre: "Raqueta de tenis",
    categoria: "tenis",
    precio: 38000,
    imagen: "raqueta-tenis.svg",
  },
  {
    id: 9,
    nombre: "Pelotas de tenis x4",
    categoria: "tenis",
    precio: 1200,
    imagen: "pelotas-tenis.svg",
  },
  {
    id: 10,
    nombre: "Pelota de vóley",
    categoria: "voley",
    precio: 11000,
    imagen: "pelota-voley.svg",
  },
  {
    id: 11,
    nombre: "Rodilleras",
    categoria: "voley",
    precio: 4200,
    imagen: "rodilleras.svg",
  },
];

const canchas = [
  {
    id: 1,
    nombre: "Fútbol 5",
    tipo: "futbol",
    precio: 3500,
    horarios: ["09:00", "11:00", "14:00", "16:00", "20:00"],
  },
  {
    id: 2,
    nombre: "Pádel 1",
    tipo: "padel",
    precio: 2800,
    horarios: ["08:00", "10:00", "12:00", "15:00", "18:00"],
  },
  {
    id: 3,
    nombre: "Pádel 2",
    tipo: "padel",
    precio: 2800,
    horarios: ["09:00", "11:00", "13:00", "17:00", "19:00"],
  },
  {
    id: 4,
    nombre: "Tenis",
    tipo: "tenis",
    precio: 2200,
    horarios: ["08:00", "10:00", "14:00", "16:00", "18:00"],
  },
  {
    id: 5,
    nombre: "Básquet",
    tipo: "basket",
    precio: 3000,
    horarios: ["10:00", "13:00", "16:00", "19:00", "21:00"],
  },
];

/** Da formato de pesos. */
const pesos = (n) => "$" + n.toLocaleString("es-AR");

/** Lee el carrito guardado. */
const leerCarrito = () => JSON.parse(localStorage.getItem("carrito") || "[]");

/** Guarda el carrito. */
const guardarCarrito = (carrito) =>
  localStorage.setItem("carrito", JSON.stringify(carrito));

/** Agrega un producto al carrito. */
const agregarCarrito = (id) => {
  const carrito = leerCarrito();
  const item = carrito.find((x) => x.tipo === "producto" && x.id === id);
  if (item) item.cantidad++;
  else carrito.push({ tipo: "producto", id: id, cantidad: 1 });
  guardarCarrito(carrito);
  mostrarCarrito();
};

/** Cambia la cantidad de un producto. */
const cambiarCantidad = (id, cambio) => {
  const carrito = leerCarrito();
  const item = carrito.find((x) => x.tipo === "producto" && x.id === id);
  if (!item) return;
  item.cantidad += cambio;
  if (item.cantidad <= 0) carrito.splice(carrito.indexOf(item), 1);
  guardarCarrito(carrito);
  mostrarCarrito();
};

/** Elimina un elemento del carrito. */
const eliminarItem = (indice) => {
  const carrito = leerCarrito();
  carrito.splice(indice, 1);
  guardarCarrito(carrito);
  mostrarCarrito();
};

/** Vacía el carrito. */
const vaciarCarrito = () => {
  localStorage.removeItem("carrito");
  mostrarCarrito();
};

/** Muestra productos y reservas dentro del carrito. */
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
      const subtotal = p.precio * item.cantidad;
      total += subtotal;
      cantidad += item.cantidad;
      html += `<div class="item-carrito"><strong>${p.nombre}</strong><p>${pesos(p.precio)} x ${item.cantidad} = ${pesos(subtotal)}</p><button type="button" onclick="cambiarCantidad(${p.id},-1)">-</button> <button type="button" onclick="cambiarCantidad(${p.id},1)">+</button> <button type="button" onclick="eliminarItem(${indice})">Eliminar</button></div>`;
    }

    if (item.tipo === "reserva") {
      total += item.precio;
      cantidad++;
      html += `<div class="item-carrito"><strong>Reserva: ${item.cancha}</strong><p>Fecha: ${item.fecha} - Hora: ${item.hora} - Personas: ${item.personas}</p><p>${pesos(item.precio)}</p><button type="button" onclick="eliminarItem(${indice})">Cancelar reserva</button></div>`;
    }
  });
if (caja) {
    caja.innerHTML = carrito.length
      ? html +
        `<hr>
        <h3>Total: ${pesos(total)}</h3>
        <div class="acciones-carrito">
          <button class="boton" type="button" onclick="vaciarCarrito()">Vaciar carrito</button>
          <button class="boton boton-comprar" type="button" onclick="procesarCompra()">Comprar</button>
        </div>`
      : "<p>El carrito está vacío.</p>";
  }
  document
    .querySelectorAll(".nav-contador")
    .forEach((e) => (e.textContent = cantidad));
};

/** Filtra productos por categoría y búsqueda. */
const filtrarProductos = () => {
  const cat = document.getElementById("filtro");
  const bus = document.getElementById("busqueda");
  if (!cat || !bus) return;
  const texto = bus.value.toLowerCase().trim();
  document.querySelectorAll(".producto").forEach((card) => {
    const okCat =
      cat.value === "todos" ||
      card.dataset.categoria === cat.value ||
      (cat.value === "otros" &&
        ["basket", "tenis", "voley"].includes(card.dataset.categoria));
    const okTexto = card.dataset.nombre.includes(texto);
    card.classList.toggle("oculto", !(okCat && okTexto));
  });
};

/** Carga los horarios de la cancha elegida. */
const cargarHorarios = () => {
  const select = document.getElementById("cancha");
  const hora = document.getElementById("hora");
  if (!select || !hora) return;
  const cancha = canchas.find((x) => x.id === Number(select.value));
  hora.innerHTML = '<option value="">Elegir horario</option>';
  if (cancha)
    canchas
      .find((x) => x.id === cancha.id)
      .horarios.forEach(
        (h) => (hora.innerHTML += `<option value="${h}">${h}</option>`),
      );
};

/** Guarda una reserva de cancha dentro del carrito. */
const reservar = (e) => {
  e.preventDefault();
  const fecha = document.getElementById("fecha").value;
  const cancha = canchas.find(
    (x) => x.id === Number(document.getElementById("cancha").value),
  );
  const hora = document.getElementById("hora").value;
  const personas = Number(document.getElementById("personas").value);
  const mensaje = document.getElementById("mensaje-reserva");
  const hoy = new Date().toISOString().split("T")[0];

  if (
    !cancha ||
    !fecha ||
    !hora ||
    personas < 1 ||
    personas > 20 ||
    fecha < hoy
  ) {
    mensaje.textContent = "Revisá los datos de la reserva.";
    return;
  }

  const carrito = leerCarrito();
  carrito.push({
    tipo: "reserva",
    cancha: cancha.nombre,
    fecha: fecha,
    hora: hora,
    personas: personas,
    precio: cancha.precio,
  });
  guardarCarrito(carrito);
  mensaje.textContent = "Cancha reservada y agregada al carrito.";
  mostrarCarrito();
  e.target.reset();
  document.getElementById("hora").innerHTML =
    '<option value="">Elegir horario</option>';
};

window.addEventListener("DOMContentLoaded", () => {
  mostrarCarrito();
  document
    .querySelectorAll(".agregar")
    .forEach((btn) =>
      btn.addEventListener("click", () =>
        agregarCarrito(Number(btn.dataset.id)),
      ),
    );
  document
    .getElementById("filtro")
    ?.addEventListener("change", filtrarProductos);
  document
    .getElementById("busqueda")
    ?.addEventListener("input", filtrarProductos);
  document.getElementById("cancha")?.addEventListener("change", cargarHorarios);
  document.getElementById("reserva")?.addEventListener("submit", reservar);

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
  };
  
 
});
const procesarCompra = () => {
  const carrito = leerCarrito();
  
  if (carrito.length === 0) {
    alert("El carrito está vacío.");
    return;
  }

  // Ocultamos el carrito y mostramos el formulario
  document.getElementById("carrito").style.display = "none";
  document.getElementById("formulario-checkout").style.display = "block";
};

const probarFormulario = () => {
  alert("!SU COMPRA A SIDO REGISTRADA CON EXITO NOS CONTACTAREMOS CON USTED PARA LA ENTREGA.");
};
