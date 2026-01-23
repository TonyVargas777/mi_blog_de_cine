import React from "react";
import { useState, useEffect } from "react";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";
import { Listado } from "./Listado";

export const Articulos = () => {
  const [articulos, setArticulos] = useState([]);
  const [cargando, setCargando] = useState(true);

  useEffect(() => {
    conseguirArticulos();
  }, []);

  const conseguirArticulos = async () => {
    const url = Global.url+"articulos";

    const { datos, cargando } = await Peticion(Global.url + "articulos", "GET");

    if (datos.status === "success") {
      setArticulos(datos.articulos);
    }

    setCargando(false);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);
  
  return (
    <>
      {cargando ? (
        <section className="dots-container">
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
        <div className="dot"></div>
      </section>
      

      ) : articulos.length >= 1 ? (
        <Listado articulos={articulos} setArticulos={setArticulos} />
      ) : (
        <div className="jumbo">
          <img className="error-404" src="/img/no_hay_articulos.avif" alt="No hay artículos" />
        <h2>No hay artículos</h2>
        </div>
      )}
    </>
  );
};
