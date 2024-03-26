import { useEffect } from "react"
import React from 'react'

export const Inicio = () => {

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className='jumbo'>
      <h1 className='type'>Bienvenido a Mi_Blog</h1>
      <h2>Blog desarrollado con el MERN Stack</h2>
      <div >
        <div>
          <img src="/img/mern7.jpeg" id='mern' alt=""/>
          <h3>(Mongo, Express, React y Node)</h3> 
        </div>
          
      </div>
    </div>
  )
}
