const validator = require("validator");

const validarArticulo = (parametros, esEdicion = false) => {
    if (!esEdicion) {
        // Validación estricta para la creación
        let validar_titulo = !validator.isEmpty(parametros.titulo || "") && 
                                validator.isLength(parametros.titulo, { min: 5 });
        let validar_contenido = !validator.isEmpty(parametros.contenido || "");

        if (!validar_titulo || !validar_contenido) {
            throw new Error("No se ha validado la información !!");
        }
    } else {
        // Validación flexible para la edición
        const tieneCamposValidos = (parametros.titulo && validator.isLength(parametros.titulo, { min: 5 })) ||
                                   (parametros.contenido && !validator.isEmpty(parametros.contenido)) ||
                                   (parametros.fecha && validator.isDate(parametros.fecha, { format: 'YYYY-MM-DD' }));

        if (!tieneCamposValidos) {
            throw new Error("Debe haber al menos un campo válido para actualizar (título, contenido o fecha) !!");
        }
    }
};


module.exports = {
    validarArticulo
};
