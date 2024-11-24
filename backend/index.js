const conexion = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");
const cron = require('node-cron');
const loadJSONToDB = require('./helpers/loadJSONToDB'); // Ruta al nuevo script

// Configura una tarea cron (por ejemplo, cada 5 minutos)
console.log('Tarea cron configurada para ejecutarse cada 5 minutos');
cron.schedule('*/5 * * * *', async () => {
  console.log('Ejecutando tarea cron en el servidor...');
  try {
    await loadJSONToDB();
  } catch (error) {
    console.error('Error al ejecutar la tarea programada:', error);
  }
});

// Inicializar app
console.log("App de node arrancada");

// Conectar a la base de datos
conexion();

// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());

// Convertir body a objeto js
app.use(express.json()); // recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})); // form-urlencoded
app.set('view engine', 'pug');

// RUTAS
const rutas_articulo = require("./rutas/articulo");

// Cargo las rutas
app.use("/api", rutas_articulo);




app.get("/", (req, res) => {


    return res.status(200).send(
        "<h1>Empezando a crear un api rest con node</h1>"
    );

});

// Crear servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log("Servidor corriendo en el puerto " + puerto);
});

