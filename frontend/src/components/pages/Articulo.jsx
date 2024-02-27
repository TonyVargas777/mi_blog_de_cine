import React from "react";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const params = useParams();

  const [articulos, setArticulos] = useState({});

  const eliminar = async(id) => {
    let {datos} = await Peticion(Global.url+"articulo/"+id, "DELETE");
    if(datos.status == "success"){
      let articulosActualizados = articulos.filter(articulo => articulo._id != id);
      setArticulos(articulosActualizados)
    }
  }

  useEffect(() => {
    conseguirArticulo();
  }, []);

  const conseguirArticulo = async () => {
    const { datos, cargando } = await Peticion(
      Global.url + "articulo/" + params.id,
      "GET"
    );

    if (datos.status === "success") {
      setArticulo(datos.articulo);
    }

    setCargando(false);
  };
  return (
    <div className="jumbo">
      {cargando ? (
        <section class="dots-container">
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
        <div class="dot"></div>
      </section>
      
      ) : (
        <>
          <h1>{articulo.titulo}</h1>
          <div className="jumbo-articulo">
            <div className="mascara">
              {articulo.imagen != "default.png" && (
                <img src={Global.url + "imagen/" + articulo.imagen} />
              )}
              {articulo.imagen == "default.png" && <img src="https://www.idsplus.net/wp-content/uploads/js-logo-badge-512.png.png" />}
            </div>
            <div className="ficha-articulo">
            <h1>
              <b>{articulo.fecha}</b>
            </h1>
            <h3>{articulo.contenido}</h3>
          </div></div>
          <div><Link to={"/editar/" + articulo._id} className="edit">
            Editar
          </Link>
          <button
            className="delete"
            onClick={() => {
              eliminar(articulo._id);
            }}
          >
            Borrar
          </button></div>
        </>
      )}
    </div>
  );
};
