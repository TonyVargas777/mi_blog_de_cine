import { useEffect } from "react"
import React from 'react'

export const Inicio = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='jumbo'>
      <div className='inicio'>
        <h1 className='type'>Bienvenido a Mi_Blog</h1>
        <h2>Blog desarrollado con el MERN Stack</h2>
        <img src="/img/mern7.jpeg" id='mern' alt="" />
        <h4>(Mongo, Express, React y Node)</h4>
        <br />
        <h4>🎬 Blog de Cine - MERN Stack</h4>        
        <p className="inicio_p">
          <ul>
            <li>
              Explorar: Consulta las fichas de las 20 películas predefinidas en la base de datos.
            </li>
            <li>
              Crear: Agrega nuevas fichas de películas con información personalizada.
            </li>
            <li>
              Editar: Modifica la información de cualquier ficha existente.
            </li>
            <li>
              Eliminar: Borra fichas de películas de forma sencilla.
            </li>
            <li>
          Base de Datos Reseteable: La base de datos se restablece automáticamente cada 10 minutos.
            </li>
          </ul>
        </p>
      </div>
    </div>
  )
}
