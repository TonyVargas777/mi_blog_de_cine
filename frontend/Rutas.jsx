import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import { Inicio } from "../components/pages/Inicio";
import { Articulos } from "../components/pages/Articulos";
import { Header } from "../components/layout/Header";
import { Nav } from "../components/layout/Nav";
import { Sidebar } from "../components/layout/Sidebar";
import { Footer } from "../components/layout/Footer";
import { Crear } from "../components/pages/Crear";
import { Contacto } from "../components/pages/Contacto";
import { Busqueda } from "../components/pages/Busqueda";
import { Articulo } from "../components/pages/Articulo";
import { Editar } from "../components/pages/Editar";

export const Rutas = () => {
  return (
    <BrowserRouter>
      <Header />
      <Nav />

      <section className="content" id="content">
        <Routes>
          <Route path="/" element={<Inicio />} />
          <Route path="/inicio" element={<Inicio />} />
          <Route path="/articulos" element={<Articulos />} />
          <Route path="/crear-articulos" element={<Crear/>} /> 
          <Route path="/contacto" element={<Contacto/>}/>
          <Route path="/buscar/:busqueda" element={<Busqueda/>}/>
          <Route path="/articulo/:id" element={<Articulo/>}/>
          <Route path="/editar/:id" element={<Editar/>}/>

          <Route path="/*" element={
            <div className="jumbo">
              <h1>Error 404</h1>
            </div>
          }/>
        </Routes>
      </section>
      <Sidebar/>
      <Footer/>
    </BrowserRouter>
  );
};
