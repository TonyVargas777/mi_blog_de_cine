import React, { useState, useEffect } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Global } from "../../helpers/Global";
import { Peticion } from "../../helpers/Peticion";

export const Articulo = () => {
  const [articulo, setArticulo] = useState({});
  const [cargando, setCargando] = useState(true);
  const [articulos, setArticulos] = useState([]);
  const [showConfirmPopup, setShowConfirmPopup] = useState(false); // Estado para mostrar el popup
  const [articuloAEliminar, setArticuloAEliminar] = useState(null); // Estado para almacenar el artículo a eliminar

  const params = useParams();
  const navigate = useNavigate(); // Usamos el hook para redirigir

  const eliminar = async (id) => {
    // Petición DELETE para eliminar el artículo
    let { datos } = await Peticion(Global.url + "articulo/" + id, "DELETE");
    if (datos.status === "success") {
      // Actualizar el estado de los artículos y redirigir
      let articulosActualizados = articulos.filter(articulo => articulo._id !== id);
      setArticulos(articulosActualizados);
      navigate("/articulos"); // Redirige a la página de Artículos después de borrar
    }
  };

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

  const mostrarPopupConfirmacion = (id) => {
    setArticuloAEliminar(id); // Guardar el id del artículo a eliminar
    setShowConfirmPopup(true); // Mostrar el popup
  };

  const cancelarEliminacion = () => {
    setShowConfirmPopup(false); // Ocultar el popup
    setArticuloAEliminar(null); // Limpiar el artículo a eliminar
  };

  const confirmarEliminacion = () => {
    eliminar(articuloAEliminar); // Llamar a la función de eliminación
    setShowConfirmPopup(false); // Ocultar el popup
    setArticuloAEliminar(null); // Limpiar el artículo a eliminar
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="jumbo">
      {cargando ? (
        <section className="dots-container">
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
          <div className="dot"></div>
        </section>
      ) : (
        <>
          <h2>{articulo.titulo}</h2>
          <div className="jumbo-articulo">
            <div className="mascara">
              {articulo.imagen !== "default.png" && (
                <img
                  src={Global.url + "imagen/" + articulo.imagen}
                  alt={articulo.titulo}
                />
              )}
              {articulo.imagen === "default.png" && (
                <img
                  src="https://www.idsplus.net/wp-content/uploads/js-logo-badge-512.png"
                  alt="Imagen por defecto"
                />
              )}
            </div>
            <div className="ficha-articulo">
              <h2>
                <b>{articulo.fecha}</b>
              </h2>
              <h3>{articulo.contenido}</h3>
            </div>
          </div>

          <div>
            <Link to={"/editar/" + articulo._id} className="edit">
              Editar
            </Link>
            <button
              className="delete"
              onClick={() => mostrarPopupConfirmacion(articulo._id)}
            >
              Borrar
            </button>
          </div>

          {/* Botón Volver */}
          <div>
          <button className="volver" onClick={() => navigate("/articulos")}>
            Volver
          </button>
          </div>

          {/* Popup de confirmación */}
          {showConfirmPopup && (
            <div className="popup-confirmacion">
              <div className="popup-content">
                <h3>¿Estás seguro de que quieres borrar este artículo?</h3>
                <button className="volver" onClick={cancelarEliminacion}>No</button>
                <button className="delete" onClick={confirmarEliminacion}>Sí</button>
                <h3>Recuerda que esta página es una demo.</h3>
            <h3>Puedes realizar diferentes tareas como:</h3>
            <h3>Crear un artículo, Editarlo o Borrarlo.</h3>
            <h3>
              Recuerda que cada 10 minutos se reiniciará la BD.
            </h3>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};
