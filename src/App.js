import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AgregarAlumno from "./pages/AgregarAlumno";
import Calificar from "./pages/Calificar";
import { NextUIProvider } from "@nextui-org/react";

export default function App() {
  return (
    <NextUIProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/agregar-alumno" element={<AgregarAlumno />} />
          <Route path="/calificar" element={<Calificar />} />
        </Routes>
      </BrowserRouter>
    </NextUIProvider>
  );
}
