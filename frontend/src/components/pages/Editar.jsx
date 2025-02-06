import React, { useEffect, useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useParams, useNavigate } from "react-router-dom";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";

export const Editar = () => {
  const { formulario, setFormulario, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const [showConfirmPopup, setShowConfirmPopup] = useState(false);
  const params = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const conseguirArticulo = async () => {
      const { datos } = await Peticion(
        Global.url + "articulo/" + params.id,
        "GET"
      );
      if (datos.status === "success") {
        setArticulo(datos.articulo);
        setFormulario({
          titulo: datos.articulo.titulo,
          contenido: datos.articulo.contenido,
          fecha: datos.articulo.fecha,
        });
      }
    };
    conseguirArticulo();
  }, [params.id, setFormulario]);

  const editarArticulo = async (e) => {
    if (e) e.preventDefault();
  
    // Crear una copia del formulario actual
    let nuevoArticulo = { ...formulario };
  
    // Verificar y asignar valores si faltan
    if (!nuevoArticulo.titulo) {
      nuevoArticulo.titulo = articulo.titulo;
    }
    if (!nuevoArticulo.contenido) {
      nuevoArticulo.contenido = articulo.contenido;
    }
  
    const { datos } = await Peticion(
      Global.url + "articulo/" + params.id,
      "PUT",
      nuevoArticulo
    );
  
    if (datos.status === "success") {
      setResultado("guardado");
  
      const fileInput = document.querySelector("#file");
  
      if (fileInput.files[0]) {
        const formData = new FormData();
        formData.append("file0", fileInput.files[0]);
  
        const subida = await Peticion(
          Global.url + "subir-imagen/" + datos.articulo._id,
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
    setShowConfirmPopup(true);
  };

  const cancelarEdicion = () => {
    setShowConfirmPopup(false);
  };

  const confirmarEdicion = async (e) => {
    e.preventDefault();
    await editarArticulo(e);
    setShowConfirmPopup(false);
    navigate("/articulo/" + params.id);
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
        {resultado === "error" ? "Debes cambiar al menos un campo" : ""}
      </strong>

      <form className="formulario" onSubmit={editarArticulo}>
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
          <label htmlFor="fecha">Fecha</label>
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
            {articulo.imagen !== "default.png" ? (
              <img src={Global.url + "imagen/" + articulo.imagen} alt="Imagen del artículo" />
            ) : (
              <img src="https://www.idsplus.net/wp-content/uploads/js-logo-badge-512.png" alt="Imagen por defecto" />
            )}
          </div>
          <input type="file" name="file0" id="file" />
        </div>

        <div>
          <button type="button" onClick={mostrarPopupConfirmacion} className="edit">
            Guardar
          </button>
          <button className="volver" type="button" onClick={() => navigate("/articulos")}> 
            Volver
          </button>
        </div>
      </form>

      {showConfirmPopup && (
        <div className="popup-confirmacion">
          <div className="popup-content">
            <h3>¿Estás seguro de que quieres guardar los cambios?</h3>
            <button className="volver" onClick={cancelarEdicion}>No</button>
            <button className="delete" onClick={confirmarEdicion}>Sí</button>
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
