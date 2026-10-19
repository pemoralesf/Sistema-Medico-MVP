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

*****************************************************************************************
# Actividad Individual
Vibecoding Guiado: Desarrollo de una Aplicación o Mini-Juego con IA como Copiloto

TAREA SEMANA 2: 

## 1.	Aplicación o mini-juego funcional
a. Ejecuta sin errores críticos.  Se  verifico que la aplicación no  presenta  errores al  ejecutarse y se  describe de la siguiente manera:

Nombre del proyecto: Sistema Médico MVP.
Objetivo: Desarrollar una aplicación web MVP para administrar la información de médicos y pacientes, utilizando inteligencia artificial como herramienta de  apoyo para la creación del proyecto.
Tecnologías utilizadas:
- HTML para la estructura de las páginas.
- CSS para el diseño visual.
- JavaScript para las interacciones del frontend.
- Node.js para ejecutar el backend.
- Express.js para crear el servidor y las rutas de la A
- Cumple con el objetivo definido (ej. juego interactivo, app simple).
- La aplicación cumple  con el objetivo de vibecoding pero también se  incluyo el criterio  de la persona para generar la aplicación de una manera estructurada y ante todo  funcional.

## 2. Evidencia de vibecoding (prompts)
- Prompt 1: Creación del sistema
Actúa como un desarrollador senior de JavaScript. Desarrolla un MVP de un Sistema Médico con dos módulos: médicos y pacientes. Utiliza Node.js, Express, HTML, CSS y JavaScript. Implementa operaciones CRUD para registrar, consultar, editar y eliminar información. Utiliza almacenamiento temporal en memoria, sin base de datos, para mantener el ejemplo sencillo. Organiza el código en archivos separados, explica cómo instalar las dependencias y cómo ejecutar la aplicación localmente.
Explicacion Prompt 1:   solicité una aplicación funcional con dos módulos CRUD y tecnologías sencillas, para obtener una primera versión que pudiera ejecutar y comprenderse.
- Prompts 2: Mejora mi Sistema Médico MVP para que, al pulsar Eliminar un médico o paciente, aparezca una confirmación antes de borrar el registro. Si el usuario cancela, el registro debe conservarse. Si confirma, debe eliminarse y actualizarse la tabla. Modifica únicamente los archivos necesarios y explícame los cambios realizados.
Explicacion Prompt 2:  Le solicite a la IA  una mejora concreta sobre la aplicación existente, sin cambiar su objetivo ni reconstruir todo el proyecto.
- Prompt 3: 
Revisa los cambios realizados en mi Sistema Médico MVP. Prepara una lista de pruebas manuales para verificar el registro, consulta, edición y eliminación de médicos y pacientes, incluyendo la confirmación y cancelación de la eliminación. Identifica posibles limitaciones y no afirmes que una prueba fue exitosa sin haberla ejecutado realmente.
Explicacion Prompt 3:  utilicé la IA para identificar escenarios de prueba y organizar la validación, pero los resultados finales debían comprobarse ejecutando el sistema.

## 3. Iteración y mejora
La primera versión del proyecto permitió implementar las operaciones CRUD para médicos y pacientes. Posteriormente, se propuso una mejora en el proceso de eliminación de registros.
Mejora solicitada: incorporar una confirmación para que el usuario pueda decidir si desea continuar con la eliminación.
Resultado esperado: evitar eliminaciones accidentales y ofrecer una interacción más segura.
Validación de la mejora: se comprobará que, al confirmar, el registro desaparezca de la tabla y que, al cancelar, permanezca sin cambios.
La mejora se documentará mediante el prompt utilizado, los cambios realizados en el código y las pruebas ejecutadas.

## 4. Validación del resultado
La aplicación se probó localmente mediante Node.js, Express y un navegador web, procedimiento de prueba:
1. Se descomprimio el proyecto
2. Se ejecutó npm install para instalar las dependencias definidas en el proyecto.
3. Se inició el servidor con npm start.
4. Se abrió la aplicación en http://localhost:3000.
5. Se probaron las operaciones de registro y edición.
6. Se detuvo el servidor con Ctrl+C y se volvió a iniciar.
7. Se actualizó el navegador para observar el comportamiento de los datos.
   
Resultado observado: las operaciones probadas funcionaron según lo esperado. Después de reiniciar el servidor, los registros guardados anteriormente desaparecieron.
Limitación identificada: el proyecto utiliza arreglos en memoria y no dispone de una base de datos persistente. Por ello, la información se pierde al reiniciar el proceso del servidor.
Pruebas adicionales: se registrarán los resultados de las pruebas de consulta, eliminación y de la mejora solicitada, una vez ejecutadas

## 5. Reflexión final
a. Qué aprendió usando IA para programar.
  Aprendi que la  IA es una  excelente herramienta  para poder  mejorar  nuestros  tiempos de respuesta como  programador , también nos  permite aprender  bloques de código a medida que la  IA  nos  genera  código pero que no se nos olvide que el código que la   IA  nos genere se debe de revisar y realizar pruebas  para  garantizar que no hay errores.
b. Qué ventajas y límites identificó del vibecoding.
Ventajas:  Nos permite generar  bloques de código  de manera eficiente, nos   permite crear casos de uso de la aplicación , generar  documentación de nuestra aplicación.
Limites: Los limites los establece  el ser  humano cuando elabora los prompts y le  solicitamos a la IA que realice  una tarea.
c. Qué partes del código comprende y cuáles necesita reforzar.
En mi caso desconocía  como funcionba JavaScript del lado del Backend por lo  cual debo de  reforzarlos


