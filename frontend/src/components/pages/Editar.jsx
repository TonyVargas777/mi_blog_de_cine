import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useParams, useNavigate } from "react-router-dom";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";

export const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Estado para el popup
  const [articuloAEditar, setArticuloAEditar] = useState(null); // Para almacenar el artículo a editar
  const params = useParams();
  const navigate = useNavigate(); // Para redirigir al artículo después de guardar

  useEffect(() => {
    conseguirArticulo();
  }, [params._id]);

  const conseguirArticulo = async () => {
    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "GET"
    );
    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }
  };

  const editarArticulo = async (e) => {
    e.preventDefault();
    let nuevoArticulo = formulario;

    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "PUT",
      nuevoArticulo
    );

    if (datos.status === "success") {
      setResultado("guardado");

      const fileInput = document.querySelector("#file");

      if (datos.status === "success" && fileInput[0]) {
        const formData = new FormData();
        formData.append("file0", fileInput[0]);

        const subida = await Peticion(
          Global.url + "subir-imagen/" + datos.articulo,
          "POST",
          formData,
          true
        );
        if (subida.datos.status === "success") {
          setResultado("guardado");
        } else {
          setResultado("error");
        }
      }
    } else {
      setResultado("error");
    }
  };

  const mostrarPopupConfirmacion = () => {
    setShowConfirmPopup(true); // Mostrar el popup
  };

  const cancelarEdicion = () => {
    setShowConfirmPopup(false); // Ocultar el popup sin hacer nada
  };

  const confirmarEdicion = () => {
    editarArticulo(); // Llamar a la función de edición
    setShowConfirmPopup(false); // Cerrar el popup
    navigate("/articulo/" + params.id); // Redirigir al artículo editado
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="jumbo">
      <h1>Editar artículo:</h1>
      <p>Formulario para editar: {articulo.titulo}</p>

      <strong>
        {resultado === "guardado" ? "Artículo guardado con éxito" : ""}
      </strong>
      <strong>
        {resultado === "error" ? "Los datos son incorrectos" : ""}
      </strong>

      <form className="formulario" onSubmit={(e) => e.preventDefault()}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input
            type="text"
            name="titulo"
            onChange={cambiado}
            defaultValue={articulo.titulo}
          />
        </div>

        <div className="form-group">
          <label htmlFor="titulo">Fecha</label>
          <input
            type="text"
            name="fecha"
            onChange={cambiado}
            defaultValue={articulo.fecha}
          />
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea
            name="contenido"
            onChange={cambiado}
            defaultValue={articulo.contenido}
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <div className="mascara">
            {articulo.imagen !== "default.png" && (
              <img src={Global.url + "imagen/" + articulo.imagen} />
            )}
            {articulo.imagen === "default.png" && (
              <img src="https://www.idsplus.net/wp-content/uploads/js-logo-badge-512.png" />
            )}
          </div>
          <input type="file" name="file0" id="file" />
        </div>
        <div>
          {/* Botón para mostrar el popup */}
          <button
            type="button"
            onClick={mostrarPopupConfirmacion}
            className="edit"
          >
            Guardar
          </button>
          {/* Botón Volver */}

          <button className="volver" onClick={() => navigate("/articulos")}>
            Volver
          </button>
        </div>
      </form>

      {/* Popup de confirmación */}
      {showConfirmPopup && (
        <div className="popup-confirmacion">
          <div className="popup-content">
            <h3>¿Estás seguro de que quieres guardar los cambios?</h3>
            <button onClick={cancelarEdicion}>No</button>
            <button onClick={confirmarEdicion}>Sí</button>
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
