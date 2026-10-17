const express = require("express");
const router = express.Router();

function validarCliente(body) {
  const nombre = String(body.nombre || "").trim();
  const telefono = String(body.telefono || "").trim();
  const correo = String(body.correo || "").trim();

  if (!nombre) return "El nombre del cliente/paciente es obligatorio.";
  if (nombre.length > 100) return "El nombre no puede superar 100 caracteres.";
  if (telefono.length > 25) return "El teléfono no puede superar 25 caracteres.";
  if (correo && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(correo)) {
    return "El correo electrónico no tiene un formato válido.";
  }
  if (correo.length > 150) return "El correo no puede superar 150 caracteres.";

  return null;
}

router.get("/", (req, res) => {
  res.json(req.app.locals.clientes);
});

router.get("/:id", (req, res) => {
  const cliente = req.app.locals.clientes.find(item => item.id === Number(req.params.id));
  if (!cliente) return res.status(404).json({ error: "Cliente/paciente no encontrado." });
  return res.json(cliente);
});

router.post("/", (req, res) => {
  const error = validarCliente(req.body);
  if (error) return res.status(400).json({ error });

  const cliente = {
    id: req.app.locals.nextClienteId++,
    nombre: String(req.body.nombre).trim(),
    telefono: String(req.body.telefono || "").trim(),
    correo: String(req.body.correo || "").trim()
  };

  req.app.locals.clientes.push(cliente);
  return res.status(201).json(cliente);
});

router.put("/:id", (req, res) => {
  const clientes = req.app.locals.clientes;
  const index = clientes.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Cliente/paciente no encontrado." });

  const error = validarCliente(req.body);
  if (error) return res.status(400).json({ error });

  clientes[index] = {
    id: clientes[index].id,
    nombre: String(req.body.nombre).trim(),
    telefono: String(req.body.telefono || "").trim(),
    correo: String(req.body.correo || "").trim()
  };

  return res.json(clientes[index]);
});

router.delete("/:id", (req, res) => {
  const clientes = req.app.locals.clientes;
  const index = clientes.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Cliente/paciente no encontrado." });

  const eliminado = clientes.splice(index, 1)[0];
  return res.json({ mensaje: "Cliente/paciente eliminado correctamente.", eliminado });
});

module.exports = router;
