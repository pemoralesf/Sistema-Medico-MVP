const estado = { modulo: "medicos", registros: [] };
const $ = selector => document.querySelector(selector);
const formulario = $("#formulario");
const mensaje = $("#mensaje");

const configuracion = {
  medicos: {
    titulo: "Mantenimiento de médicos",
    descripcion: "Registra y administra los datos básicos de los médicos.",
    endpoint: "/api/medicos",
    columnas: [
      ["id", "ID"], ["nombre", "Nombre"], ["especialidad", "Especialidad"], ["telefono", "Teléfono"]
    ]
  },
  clientes: {
    titulo: "Mantenimiento de clientes / pacientes",
    descripcion: "Registra y administra los datos básicos de clientes/pacientes.",
    endpoint: "/api/clientes",
    columnas: [["id", "ID"], ["nombre", "Nombre"], ["telefono", "Teléfono"], ["correo", "Correo"]]
  }
};

function mostrarMensaje(texto, tipo = "exito") {
  mensaje.textContent = texto;
  mensaje.className = `mensaje ${tipo}`;
  mensaje.hidden = false;
}
function ocultarMensaje() {
  mensaje.hidden = true;
  mensaje.textContent = "";
}
function limpiarFormulario() {
  formulario.reset();
  $("#registro-id").value = "";
  $("#guardar").textContent = "Guardar registro";
  $("#cancelar").hidden = true;
}
function cambiarModulo(modulo) {
  estado.modulo = modulo;
  const config = configuracion[modulo];
  $("#titulo-modulo").textContent = config.titulo;
  $("#descripcion-modulo").textContent = config.descripcion;
  $("#campo-especialidad").hidden = modulo !== "medicos";
  $("#especialidad").required = modulo === "medicos";
  $("#campo-correo").hidden = modulo !== "clientes";
  $("#correo").required = false;
  document.querySelectorAll(".pestana").forEach(btn => {
    btn.classList.toggle("activa", btn.dataset.modulo === modulo);
  });
  limpiarFormulario();
  ocultarMensaje();
  cargarRegistros();
}
async function solicitar(url, opciones = {}) {
  const respuesta = await fetch(url, {
    ...opciones,
    headers: { "Content-Type": "application/json", ...(opciones.headers || {}) }
  });
  const datos = await respuesta.json();
  if (!respuesta.ok) throw new Error(datos.error || "No fue posible completar la operación.");
  return datos;
}
async function cargarRegistros() {
  try {
    estado.registros = await solicitar(configuracion[estado.modulo].endpoint);
    pintarTabla();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
}
function crearCelda(texto) {
  const celda = document.createElement("td");
  celda.textContent = texto ?? "";
  return celda;
}
function pintarTabla() {
  const config = configuracion[estado.modulo];
  const encabezado = $("#encabezado-tabla");
  const cuerpo = $("#cuerpo-tabla");
  encabezado.replaceChildren();
  cuerpo.replaceChildren();

  const filaTitulos = document.createElement("tr");
  config.columnas.forEach(([, etiqueta]) => {
    const th = document.createElement("th");
    th.textContent = etiqueta;
    filaTitulos.appendChild(th);
  });
  const thAcciones = document.createElement("th");
  thAcciones.textContent = "Acciones";
  filaTitulos.appendChild(thAcciones);
  encabezado.appendChild(filaTitulos);

  estado.registros.forEach(registro => {
    const fila = document.createElement("tr");
    config.columnas.forEach(([campo]) => fila.appendChild(crearCelda(registro[campo])));
    const celdaAcciones = document.createElement("td");
    const grupo = document.createElement("div");
    grupo.className = "acciones-tabla";

    const editar = document.createElement("button");
    editar.type = "button";
    editar.className = "boton-tabla editar";
    editar.textContent = "Editar";
    editar.addEventListener("click", () => iniciarEdicion(registro));

    const eliminar = document.createElement("button");
    eliminar.type = "button";
    eliminar.className = "boton-tabla eliminar";
    eliminar.textContent = "Eliminar";
    eliminar.addEventListener("click", () => eliminarRegistro(registro.id));

    grupo.append(editar, eliminar);
    celdaAcciones.appendChild(grupo);
    fila.appendChild(celdaAcciones);
    cuerpo.appendChild(fila);
  });

  $("#contador").textContent = `${estado.registros.length} registro${estado.registros.length === 1 ? "" : "s"}`;
  $("#sin-registros").hidden = estado.registros.length > 0;
}
function iniciarEdicion(registro) {
  $("#registro-id").value = registro.id;
  $("#nombre").value = registro.nombre || "";
  $("#telefono").value = registro.telefono || "";
  $("#especialidad").value = registro.especialidad || "";
  $("#correo").value = registro.correo || "";
  $("#guardar").textContent = "Guardar cambios";
  $("#cancelar").hidden = false;
  ocultarMensaje();
  $("#nombre").focus();
}
formulario.addEventListener("submit", async evento => {
  evento.preventDefault();
  ocultarMensaje();

  const id = $("#registro-id").value;
  const datos = {
    nombre: $("#nombre").value.trim(),
    telefono: $("#telefono").value.trim()
  };
  if (estado.modulo === "medicos") datos.especialidad = $("#especialidad").value.trim();
  else datos.correo = $("#correo").value.trim();

  const endpoint = configuracion[estado.modulo].endpoint;
  try {
    await solicitar(id ? `${endpoint}/${id}` : endpoint, {
      method: id ? "PUT" : "POST",
      body: JSON.stringify(datos)
    });
    mostrarMensaje(id ? "Registro actualizado correctamente." : "Registro creado correctamente.");
    limpiarFormulario();
    await cargarRegistros();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
});
async function eliminarRegistro(id) {
  const tipo = estado.modulo === "medicos" ? "médico" : "cliente/paciente";
  if (!window.confirm(`¿Seguro que deseas eliminar este ${tipo}?`)) return;
  try {
    await solicitar(`${configuracion[estado.modulo].endpoint}/${id}`, { method: "DELETE" });
    mostrarMensaje("Registro eliminado correctamente.");
    await cargarRegistros();
  } catch (error) {
    mostrarMensaje(error.message, "error");
  }
}
document.querySelectorAll(".pestana").forEach(btn => {
  btn.addEventListener("click", () => cambiarModulo(btn.dataset.modulo));
});
$("#cancelar").addEventListener("click", limpiarFormulario);
$("#limpiar").addEventListener("click", () => { limpiarFormulario(); ocultarMensaje(); });
$("#recargar").addEventListener("click", cargarRegistros);

cambiarModulo("medicos");
