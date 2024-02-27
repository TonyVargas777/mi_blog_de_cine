import React from "react";
import { useState } from "react";
import { useForm } from "../../hooks/useForm";
import { Peticion } from "../../helpers/Peticion";
import { Global } from "../../helpers/Global";

export const Crear = () => {
  const { formulario, enviado, cambiado } = useForm({});
  const [resultado, setResultado] = useState("no_enviado");

  const guardarArticulo = async (e) => {
    e.preventDefault();
    let nuevoArticulo = formulario;
  
    const { datos } = await Peticion(
      Global.url + "crear",
      "POST",
      nuevoArticulo
    );
  
    if (datos.status === "success") {
      setResultado("guardado");
  
      const fileInput = document.querySelector("#file");
  
      if (fileInput) {
        const formData = new FormData();
        for (let i = 0; i < fileInput.files.length; i++) {
          formData.append("file" + i, fileInput.files[i]); // Append files with unique names
        }
  
        const subida = await Peticion(
          Global.url + "subir-imagen/" + datos.articulo._id, // Corrected URL
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
  return (
    <div className="jumbo">
      <h1>Crear artículo:</h1>
      <p>Formulario para crear un artículo:</p>

      <strong>
        {resultado === "guardado" ? "Artículo guardado con éxito" : ""}
      </strong>
      <strong>{resultado === "error" ? "Los datos son incorrectos" : ""}</strong>

      <form className="formulario" onSubmit={guardarArticulo}>
        <div className="form-group">
          <label htmlFor="titulo">Título</label>
          <input type="text" name="titulo" onChange={cambiado} aria-labelledby="titulo"/>
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Contenido</label>
          <textarea type="text" name="contenido" onChange={cambiado} aria-labelledby="contenido"/>
        </div>

        <div className="form-group">
          <label htmlFor="contenido">Año:</label>
          <input type="text" name="fecha" onChange={cambiado} aria-labelledby="anyo"/>
        </div>

        <div className="form-group">
          <label htmlFor="file0">Imagen</label>
          <input type="file" name="file0" id="file" aria-labelledby="file0"/>
        </div>
        <input type="submit" value="Guardar" className="btn btn-success" />
      </form>
    </div>
  );
};

