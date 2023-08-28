import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import AlumnoHome from "./pages/AlumnoHome";
import AgregarAlumno from "./pages/AgregarAlumno";
import PrivateRoutes from "./pages/PrivateRoutes";
import Login from "./auth/Login";

export default function App() {
  return (
    <BrowserRouter>
      
      <Routes>
      <Route path="/login" element={<Login />} />
        <Route element={<PrivateRoutes />}>
          <Route path="/agregar-alumno" element={<AgregarAlumno />} />
          <Route path="/" element={<AlumnoHome />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}
