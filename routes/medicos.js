const express = require("express");
const router = express.Router();

function validarMedico(body) {
  const nombre = String(body.nombre || "").trim();
  const especialidad = String(body.especialidad || "").trim();
  const telefono = String(body.telefono || "").trim();

  if (!nombre) return "El nombre del médico es obligatorio.";
  if (nombre.length > 100) return "El nombre no puede superar 100 caracteres.";
  if (!especialidad) return "La especialidad es obligatoria.";
  if (especialidad.length > 80) return "La especialidad no puede superar 80 caracteres.";
  if (telefono.length > 25) return "El teléfono no puede superar 25 caracteres.";

  return null;
}

router.get("/", (req, res) => {
  res.json(req.app.locals.medicos);
});

router.get("/:id", (req, res) => {
  const medico = req.app.locals.medicos.find(item => item.id === Number(req.params.id));
  if (!medico) return res.status(404).json({ error: "Médico no encontrado." });
  return res.json(medico);
});

router.post("/", (req, res) => {
  const error = validarMedico(req.body);
  if (error) return res.status(400).json({ error });

  const medico = {
    id: req.app.locals.nextMedicoId++,
    nombre: String(req.body.nombre).trim(),
    especialidad: String(req.body.especialidad).trim(),
    telefono: String(req.body.telefono || "").trim()
  };

  req.app.locals.medicos.push(medico);
  return res.status(201).json(medico);
});

router.put("/:id", (req, res) => {
  const medicos = req.app.locals.medicos;
  const index = medicos.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Médico no encontrado." });

  const error = validarMedico(req.body);
  if (error) return res.status(400).json({ error });

  medicos[index] = {
    id: medicos[index].id,
    nombre: String(req.body.nombre).trim(),
    especialidad: String(req.body.especialidad).trim(),
    telefono: String(req.body.telefono || "").trim()
  };

  return res.json(medicos[index]);
});

router.delete("/:id", (req, res) => {
  const medicos = req.app.locals.medicos;
  const index = medicos.findIndex(item => item.id === Number(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Médico no encontrado." });

  const eliminado = medicos.splice(index, 1)[0];
  return res.json({ mensaje: "Médico eliminado correctamente.", eliminado });
});

module.exports = router;
