const { MongoClient, ObjectId } = require('mongodb');
const fs = require('fs');
const path = require('path');

// URI de conexión a MongoDB Atlas
const uri = "mongodb+srv://tonacovargas:Tvg1Sgg2Rvg3@cluster0.ayoz2ut.mongodb.net/mi_blog";
const client = new MongoClient(uri);

async function actualizarBaseDeDatos() {
    let client;
    try {
        console.log("Intentando conectar a MongoDB...");
        client = new MongoClient(uri);
        await client.connect();
        console.log("Conectado a MongoDB Atlas");

        const db = client.db("mi_blog");
        const collection = db.collection("articulos");

        // Eliminar todos los documentos existentes
        const deleteResult = await collection.deleteMany({});
        console.log(`Eliminados ${deleteResult.deletedCount} documentos existentes`);

        // Leer y cargar datos desde un archivo JSON
        const filePath = path.resolve(__dirname, 'mi_blog.articulos.json');
        const data = JSON.parse(fs.readFileSync(filePath, 'utf-8'));

        // Convertir el _id de cada documento a ObjectId si es una cadena de texto
        const formattedData = data.map(item => ({
            ...item,
            _id: ObjectId(item._id) // Convertir la cadena _id a ObjectId
        }));

        // Insertar los nuevos datos
        const insertResult = await collection.insertMany(formattedData);
        console.log(`Insertados ${insertResult.insertedCount} documentos nuevos`);
    } catch (err) {
        console.error("Error actualizando la base de datos:", err);
    } finally {
        if (client) {
            await client.close();
            console.log("Conexión a MongoDB cerrada");
        }
    }
}


module.exports = { actualizarBaseDeDatos };
