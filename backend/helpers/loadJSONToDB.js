const fs = require('fs');
const mongoose = require('mongoose');
const connectDB = require('../basedatos/conexion'); // Importar función de conexión
const Articulo = require('../modelos/Articulo'); // Modelo de tu colección

const loadJSONToDB = async () => {
  try {
    // Conectar a MongoDB
    await connectDB();

    // Leer archivo JSON
    const data = JSON.parse(fs.readFileSync('mi_blog.articulos.json', 'utf8'));

    // Validar y transformar los datos
    const formattedData = data.map(item => {
      // Convertir _id a ObjectId si existe y está en formato correcto
      if (item._id && typeof item._id === 'string') {
        item._id = new mongoose.Types.ObjectId(item._id);
      } else {
        delete item._id; // Eliminar _id si no es válido y permitir que MongoDB lo genere
      }
      return item;
    });

    // Opcional: Limpia la colección antes de cargar los datos nuevos
    await Articulo.deleteMany({});

    // Insertar los datos en la colección
    await Articulo.insertMany(formattedData);

    console.log('Datos cargados exitosamente a MongoDB');
  } catch (err) {
    console.error('Error al cargar los datos:', err);
  } finally {
    // Cierra la conexión a MongoDB
    mongoose.connection.close();
  }
};

module.exports = loadJSONToDB;
