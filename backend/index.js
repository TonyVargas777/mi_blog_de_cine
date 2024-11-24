const conexion = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");
const cron = require('node-cron');
const loadJSONToDB = require('./helpers/loadJSONToDB'); // Ruta al nuevo script

// Configura una tarea cron (por ejemplo, cada hora en punto)
cron.schedule('0 * * * *', async () => {
  console.log('Ejecutando tarea programada: cargar JSON a MongoDB');
  await loadJSONToDB();
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

