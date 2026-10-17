# Sistema Médico MVP — Kodigo Semana 2

Aplicación académica local con dos mantenimientos CRUD: médicos y clientes/pacientes.

## Tecnologías
- Node.js + Express (backend/API REST)
- HTML, CSS y JavaScript (frontend)
- Arreglos de objetos en memoria (sin base de datos persistente)

## Requisitos
- Node.js LTS instalado
- Visual Studio Code recomendado

## Instalación y ejecución
1. Descomprime la carpeta del proyecto.
2. Abre esa carpeta en VS Code.
3. Abre Terminal > New Terminal.
4. Comprueba `node -v` y `npm -v`.
5. Ejecuta `npm install`.
6. Ejecuta `npm start`.
7. Abre `http://localhost:3000`.
8. Para comprobar la API abre `http://localhost:3000/api/health`.

Para detener el servidor, vuelve a la terminal y presiona Ctrl+C.

## Endpoints
### Médicos
- GET `/api/medicos` — listar
- GET `/api/medicos/:id` — consultar uno
- POST `/api/medicos` — crear
- PUT `/api/medicos/:id` — actualizar
- DELETE `/api/medicos/:id` — eliminar

Ejemplo JSON para POST/PUT:
`{"nombre":"Ana López","especialidad":"Medicina general","telefono":"7000-0000"}`

### Clientes/pacientes
- GET `/api/clientes` — listar
- GET `/api/clientes/:id` — consultar uno
- POST `/api/clientes` — crear
- PUT `/api/clientes/:id` — actualizar
- DELETE `/api/clientes/:id` — eliminar

Ejemplo JSON para POST/PUT:
`{"nombre":"Carlos Pérez","telefono":"7000-1111","correo":"carlos@example.com"}`

## Almacenamiento
Los registros se guardan temporalmente en la memoria del proceso Node.js. Se pierden al detener o reiniciar el servidor. No se usa una base de datos real, porque el alcance del MVP busca simplificar el almacenamiento.

## Pruebas manuales mínimas
1. Abrir la pantalla.
2. Crear un médico y confirmar que aparece en la tabla.
3. Editar el médico y verificar los cambios.
4. Eliminarlo y confirmar que desaparece.
5. Repetir los pasos en clientes/pacientes.
6. Intentar guardar un médico sin nombre o sin especialidad: el servidor debe rechazarlo.
7. Intentar un correo inválido en clientes: el navegador o el servidor debe rechazarlo.
8. Reiniciar el servidor y comprobar que los registros desaparecieron.
9. Abrir `/api/health` y verificar que responde con `estado: ok`.

## Limitaciones y seguridad
- Es un MVP educativo, no un sistema listo para producción.
- No incluye autenticación, autorización ni base de datos persistente.
- No introducir información real o sensible de pacientes.
- Los datos no están compartidos entre procesos y se borran al reiniciar el servidor.

## Evidencia de vibecoding
Documenta los prompts reales utilizados, qué respuesta produjo la IA, qué ajuste pediste y qué resultado comprobaste. No declares pruebas exitosas hasta ejecutarlas.
