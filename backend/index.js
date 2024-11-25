const { conexion } = require("./basedatos/conexion");
const express = require("express");
const cors = require("cors");
const cron = require('node-cron');
const { actualizarBaseDeDatos } = require('./helpers/actualizarDB');
const actualizarRouter = require('./rutas/actualizar');


// Crear servidor Node
const app = express();
const puerto = 3900;

// Configurar cors
app.use(cors());
app.use('/api', actualizarRouter);

// Inicializar app
console.log("App de node arrancada");

// Conectar a la base de datos
conexion();



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

// Configurar la tarea cron (ejecuta cada día a medianoche)
cron.schedule('*/10 * * * *', async () => {
    try {
        console.log("Ejecutando tarea automática para actualizar la base de datos...");
        await actualizarBaseDeDatos();
        console.log("Tarea cron finalizada correctamente.");
    } catch (error) {
        console.error("Error durante la ejecución de la tarea cron:", error);
    }
});

