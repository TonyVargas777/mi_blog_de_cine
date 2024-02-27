import React, { useEffect } from "react";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { useParams } from "react-router-dom";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";

export const Editar = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");
  const [articulo, setArticulo] = useState({});
  const params = useParams();

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
      Global.url + "articulo/"+params.id,
      "PUT",
      nuevoArticulo
    );

    if (datos.status === "success") {
      setResultado("guardado");
    } else {
      setResultado("error");
    }

    const fileInput = document.querySelector("#file");

    if (datos.status === "success" && fileInput[0]) {
      setResultado("guardado");

      const formData = new FormData();
      formData.append("file0", fileInput[0]);

      const subida = await Peticion(
        Global.url + "subir-imagen/" + datos.articulo,
        "POST",
        formData,
        true
      );
      console.log(datos.articulo)
      if (subida.datos.status === "success") {
        setResultado("guardado");
      } else {
        setResultado("error");
      }
    }
    
  };
  

  return (
    <div className="jumbo">
      <h1>Editar artículo:</h1>
      <p>Formulario para editar: {articulo.titulo}</p>

      <strong>
        {resultado == "guardado" ? "Artículo guardado con éxito" : ""}
      </strong>
      <strong>{resultado == "error" ? "Los datos son incorrectos" : ""}</strong>

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
            type="text"
            name="contenido"
            onChange={cambiado}
            defaultValue={articulo.contenido}            
          />
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <div className="mascara">            
            {articulo.imagen != "default.png" && (
              <img src={Global.url + "imagen/" + articulo.imagen} />
            )}
            {articulo.imagen == "default.png" && (
              <img src="https://www.idsplus.net/wp-content/uploads/js-logo-badge-512.png" />
            )}
          </div>
          <input type="file" name="file0" id="file" />
        </div>
        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
    
  );
};
