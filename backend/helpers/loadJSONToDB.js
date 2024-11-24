const fs = require('fs');
const mongoose = require('mongoose');
const MyModel = require('../modelos/Articulo'); // Ajusta la ruta si tu modelo está en otra ubicación

// Función para cargar datos desde un archivo JSON a MongoDB
const loadJSONToDB = async () => {
  try {
    const data = JSON.parse(fs.readFileSync('mi_blog.articulos.json', 'utf8'));
    await MyModel.deleteMany({}); // Opcional: Limpia la colección antes de cargar
    await MyModel.insertMany(data); // Inserta los datos
    console.log('Datos cargados exitosamente');
  } catch (err) {
    console.error('Error al cargar datos:', err);
  } finally {
    mongoose.connection.close();
  }
};

module.exports = loadJSONToDB;
