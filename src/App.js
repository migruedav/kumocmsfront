import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AgregarAlumno from "./pages/AgregarAlumno";

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/agregar-alumno" element={<AgregarAlumno />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </BrowserRouter>
  );
}
