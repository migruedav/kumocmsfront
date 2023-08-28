import React, { useState } from "react";
import ProfilePhoto from "../components/ProfilePhoto";
import { Select, SelectItem } from "@tremor/react";
import { DatePicker } from "@tremor/react";
import { supabase } from "../supabase";
import { Ring } from "@uiball/loaders";

function AgregarAlumno() {
  const [isLoading, setIsLoading] = useState(false);
  const [nombre, setNombre] = useState("");
  const [primerApellido, setPrimerApellido] = useState("");
  const [segundoApellido, setSegundoApellido] = useState("");
  const [nickname, setNickname] = useState("");
  const [grupo, setGrupo] = useState("");
  const [nivel, setNivel] = useState("");
  const [fechaNacimiento, setFechaNacimiento] = useState(new Date(2023, 1, 1));
  const [foto, setFoto] = useState("");

  async function handleSubmit(e) {
    setIsLoading(true);
    e.preventDefault();
    const { data, error } = await supabase.from("Alumnos").insert([
      {
        Foto: `https://nkbchoashjdmtmocitad.supabase.co/storage/v1/object/public/Photos/${foto}`,
        Nombre: nombre,
        PrimerApellido: primerApellido,
        SegundoApellido: segundoApellido,
        Nickname: nickname,
        Grupo: grupo,
        Nivel: nivel,
        FechaNacimiento: fechaNacimiento,
      },
    ]);
    if (error) {
      console.log(error);
    } else {
      console.log(data);
      window.location.reload();
    }
    setIsLoading(false);
  }

  return (
    <div className="flex flex-col justify-center items-center min-h-screen w-full mt-4 mb-48">
      <ProfilePhoto setFoto={setFoto} />
      <input
        placeholder="Nombre"
        type="text"
        className="border border-gray-200 w-60 h-8 rounded-lg text-center mb-4"
        onChange={(e) => setNombre(e.target.value)}
      />
      <input
        placeholder="Primer Apellido"
        type="text"
        className="border border-gray-200 w-60 h-8 rounded-lg text-center mb-4"
        onChange={(e) => setPrimerApellido(e.target.value)}
      />

      <input
        placeholder="Segundo Apellido"
        type="text"
        className="border border-gray-200 w-60 h-8 rounded-lg text-center mb-4"
        onChange={(e) => setSegundoApellido(e.target.value)}
      />
      <input
        placeholder="Nickname"
        type="text"
        className="border border-gray-200 w-60 h-8 rounded-lg text-center"
        onChange={(e) => setNickname(e.target.value)}
      />
      <div className="w-60 mt-6">
        <DatePicker
          enableYearNavigation="true"
          placeholder="Fecha de Nacimiento"
          onValueChange={(e) => setFechaNacimiento(e)}
        />
      </div>
      <div className="mt-6 w-60">
        <Select placeholder="Grupo" onChange={(e) => setGrupo(e)}>
          <SelectItem value="k5">Kumo 5pm</SelectItem>
          <SelectItem value="k6">Kumo 6pm</SelectItem>
          <SelectItem value="k7">Kumo 7pm</SelectItem>
          <SelectItem value="ch5">Chimalistac 5pm</SelectItem>
        </Select>
      </div>
      <div className="mt-6 w-60">
        <Select placeholder="Nivel" onChange={(e) => setNivel(e)}>
          <SelectItem value="1">1 - Blanca 1</SelectItem>
          <SelectItem value="2">2 - Blanca 2</SelectItem>
          <SelectItem value="3">3 - Blanca 3</SelectItem>
          <SelectItem value="4">4 - Amarilla 1</SelectItem>
          <SelectItem value="5">5 - Amarilla 2</SelectItem>
          <SelectItem value="6">6 - Amarilla 3</SelectItem>
          <SelectItem value="7">7 - Naranja 1</SelectItem>
          <SelectItem value="8">8 - Naranja 2</SelectItem>
          <SelectItem value="9">9 - Naranja 3</SelectItem>
          <SelectItem value="10">10 - Verde 1</SelectItem>
          <SelectItem value="11">11 - Verde 2</SelectItem>
          <SelectItem value="12">12 - Verde 3</SelectItem>
          <SelectItem value="13">13 - Azul 1</SelectItem>
          <SelectItem value="14">14 - Azul 2</SelectItem>
          <SelectItem value="15">15 - Azul 3</SelectItem>
          <SelectItem value="16">16 - Café 1</SelectItem>
          <SelectItem value="17">17 - Café 2</SelectItem>
          <SelectItem value="18">18 - Café 3</SelectItem>
          <SelectItem value="19">19 - Negra</SelectItem>
        </Select>
      </div>
      <button
        className="bg-RojoKumo w-60 h-10 rounded-lg text-white text-center mt-6"
        onClick={handleSubmit}
      >
        {isLoading ? (
          <div className="flex w-full justify-center items-center">
            <Ring size={20} speed={2} color="white" />
          </div>
        ) : (
          "Agregar Alumno"
        )}
      </button>
    </div>
  );
}

export default AgregarAlumno;
