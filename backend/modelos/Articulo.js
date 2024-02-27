const { Schema, model } = require("mongoose");

const ArticuloSchema = Schema({
    titulo: {
        type: String,
        required: true
    },
    contenido: {
        type: String,
        required: true
    },
    fecha: {
        type: String,
        required: true
    },
    imagen: {
        type: String,
        default: "default.png"
    }
});

module.exports = model("Articulo", ArticuloSchema, "articulos");
                      // articulos 