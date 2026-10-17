const express = require("express");
const path = require("path");
const medicosRouter = require("./routes/medicos");
const clientesRouter = require("./routes/clientes");

const app = express();
const PORT = process.env.PORT || 3000;

// Almacenamiento temporal en memoria: los registros se pierden al reiniciar Node.js.
app.locals.medicos = [];
app.locals.clientes = [];
app.locals.nextMedicoId = 1;
app.locals.nextClienteId = 1;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/health", (_req, res) => {
  res.json({ estado: "ok", mensaje: "API del Sistema Médico funcionando" });
});

app.use("/api/medicos", medicosRouter);
app.use("/api/clientes", clientesRouter);

app.use((req, res) => {
  res.status(404).json({ error: "Recurso no encontrado" });
});

app.use((err, _req, res, _next) => {
  console.error(err);
  res.status(500).json({ error: "Ocurrió un error interno en el servidor" });
});

app.listen(PORT, () => {
  console.log(`Sistema Médico disponible en http://localhost:${PORT}`);
  console.log("Aviso: los datos se guardan solo en memoria y se pierden al reiniciar el servidor.");
});
