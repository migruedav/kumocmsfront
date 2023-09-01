import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AgregarAlumno from "./pages/AgregarAlumno";
import Calificar from "./pages/Calificar";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agregar-alumno" element={<AgregarAlumno />} />
          <Route path="/calificar" element={<Calificar />} />
        </Routes>
      </BrowserRouter>
  );
}
