const { actualizarBaseDeDatos } = require('../helpers/actualizarDB');

actualizarBaseDeDatos().then(() => {
    console.log("Prueba de actualización completada");
}).catch(err => {
    console.error("Error en la prueba:", err);
});
