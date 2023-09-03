import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AgregarAlumno from "./pages/AgregarAlumno";
import Calificar from "./pages/Calificar";
import Ranking from "./pages/Ranking";
import NavBar from "./components/NavBar";

export default function App() {
  return (
      <BrowserRouter>
        <Routes>
          <Route path="/agregar-alumno" element={<AgregarAlumno />} />
          <Route path="/ranking" element={<Ranking/>} />
          <Route path="/" element={<Calificar />} />
        </Routes>
        <NavBar />
      </BrowserRouter>
  );
}
