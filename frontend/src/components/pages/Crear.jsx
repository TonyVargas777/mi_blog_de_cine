import React, { useState, useEffect } from "react";
import { useForm } from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";
import { useNavigate } from "react-router-dom"; // Para redirigir después de guardar

export const Crear = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [mostrarPopup, setMostrarPopup] = useState(false); // Para mostrar el popup
  const navigate = useNavigate(); // Usamos el hook para redirigir

  const guardarArticulo = async () => {
    let nuevoArticulo = formulario;

    const { datos } = await Peticion(Global.url + "crear", "POST", nuevoArticulo);

    if (datos.status === "success") {
      setResultado("guardado");

      const fileInput = document.querySelector("#file");

      if (fileInput) {
        const formData = new FormData();
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append("file" + i, fileInput.files[i]);
        }

        const subida = await Peticion(
          Global.url + "subir-imagen/" + datos.articulo._id,
          "POST",
          formData,
          true
        );

        if (subida.datos.status === "success") {
          setResultado("guardado");
          navigate("/articulos"); // Redirigir a Articulos.jsx
        } else {
          setResultado("error");
        }
      }
    } else {
      setResultado("error");
    }
  };

  // Función para manejar el click en "Guardar"
  const handleGuardarClick = () => {
    setMostrarPopup(true); // Mostrar el popup de confirmación
  };

  // Función para manejar la confirmación en el popup
  const confirmarGuardar = () => {
    setMostrarPopup(false); // Cerrar el popup
    guardarArticulo(); // Llamar a la función para guardar el artículo
  };

  // Función para manejar la cancelación
  const cancelarGuardar = () => {
    setMostrarPopup(false); // Solo cerrar el popup sin hacer nada
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="jumbo">
      <h1>Crear artículo:</h1>
      <p>Formulario para crear un artículo:</p>

      <strong>
        {resultado === "guardado" ? "Artículo guardado con éxito" : ""}
      </strong>
      <strong>{resultado === "error" ? "Los datos son incorrectos" : ""}</strong>

      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            name="titulo"
            onChange={cambiado}
            aria-labelledby="titulo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            type="text"
            name="contenido"
            onChange={cambiado}
            aria-labelledby="contenido"
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Año:</label>
          <input
            type="text"
            name="fecha"
            onChange={cambiado}
            aria-labelledby="anyo"
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <input
            type="file"
            name="file0"
            id="file"
            aria-labelledby="file0"
          />
        </div>

        <button
          type="button"
          className="btn btn-success"
          onClick={handleGuardarClick} // Mostrar el popup al hacer click en Guardar
        >
          Guardar
        </button>
      </form>

      {/* Popup de confirmación */}
      {mostrarPopup && (
        <div className="popup">
          <div className="popup-content">
            <p>¿Estás seguro de que quieres guardar el artículo?</p>
            <button onClick={confirmarGuardar}>Sí</button>
            <button onClick={cancelarGuardar}>No</button>
            <h3>Recuerda que esta página es una demo.</h3>
            <h3>Puedes realizar diferentes tareas como:</h3>
            <h3>Crear un artículo, Editarlo o Borrarlo.</h3>
            <h3>Recuerda que cada 10 minutos se reiniciará la BD.</h3>
          </div>
        </div>
      )}
    </div>
  );
};


