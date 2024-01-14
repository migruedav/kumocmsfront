import { DatePicker } from "@tremor/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { supabase } from "../supabase";
import React, { useEffect } from "react";

function CalCard({ Nickname, Foto, id, Grupo }) {
  const [asistencia, setAsistencia] = React.useState(true);
  const [puntualidad, setPuntualidad] = React.useState(true);
  const [uniforme, setUniforme] = React.useState(true);
  const [calificacion, setCalificacion] = React.useState("5");
  const [total, setTotal] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [totalStr, setTotalStr] = React.useState("");
  const [programa, setPrograma] = React.useState("Kobudo");
  const [estado, setEstado] = React.useState("Enviar");

  useEffect(() => {
    let totalSum = 0;
    if (puntualidad) totalSum += 3;
    if (uniforme) totalSum += 3;
    totalSum += parseInt(calificacion);
    if (asistencia) totalSum += 4;
    else totalSum = 0;
    setTotal(totalSum);
  }, [asistencia, puntualidad, uniforme, calificacion]);

  function handleIncrement() {
    setTotal(total + 1);
  }

  useEffect(() => {
    let totalStr = "";
    if (calificacion < 1) totalStr = "Pésimo";
    else if (calificacion < 2) totalStr = "Muy Mal";
    else if (calificacion < 4) totalStr = "Mal";
    else if (calificacion < 7) totalStr = "Regular";
    else if (calificacion < 9) totalStr = "Bien";
    else if (calificacion < 10) totalStr = "Muy Bien";
    else if (calificacion < 11) totalStr = "Excelente";
    setTotalStr(totalStr);
  }, [calificacion]);

  const dt = new Date(2023, 7, 31);
  const formattedDate = `${dt.getFullYear()}-${(dt.getMonth() + 1)
    .toString()
    .padStart(2, "0")}-${dt.getDate().toString().padStart(2, "0")}`;

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("Calendario")
        .select("*")
        .eq("fecha", formattedDate);
      if (error) {
        console.log(error);
      } else {
        data[0] ? setPrograma(data[0].programa) : setPrograma(1);
      }
    }
    fetchData();
  }, [formattedDate]);

  async function handleClick() {
    const { data, error } = await supabase
      .from("Koins")
      .insert([
        {
          alumno: id,
          fecha: date,
          koins: total,
          programa: programa,
          uniforme: uniforme,
          puntualidad: puntualidad,
        },
      ])
      .select();
    if (error) {
      console.log(error);
    } else {
      setEstado("Enviado");
      console.log(data);
    }
  }


  async function twenty() {
    if (total >= 20) {
      const { data, error } = await supabase
        .from("Diamonds")
        .insert([
          {
            diamonds: 100,
            alumno: id,
            motivo: "Clase Perfecta",
          },
        ])
        .select();
      if (error) {
        console.log(error);
      } else {
        console.log("Se aumentaron 100 diamonds");
      }
    }
  }

  return (
    <div>
      <div className="bg-white w-[350px] rounded-2xl flex flex-col justify-center items-center gap-3 py-10">
        <div
          className="h-40 w-40 rounded-full bg-cover bg-center bg-no-repeat mb-4 border-5 border-gray-600"
          style={{
            backgroundImage: `url(${Foto})`,
          }}
        ></div>
        <h1 className="text-2xl font-semibold">{Nickname}</h1>
        <select
          className="select select-bordered w-60 max-w-xs text-center"
          value={programa}
          onChange={(e) => setPrograma(e.target.value)}
        >
          <option value={1}>Kata</option>
          <option value={2}>Kumite</option>
          <option value={3}>Kobudo</option>
          <option value={4}>Antibullying</option>
        </select>

        <DatePicker
          className="w-60 mb-2 z-20"
          value={date}
          onValueChange={(e) => {
            setDate(e);
          }}
        />

        <div className="flex flex-row justify-between w-40 items-center h-6 gap-6 z-0">
          <p>Asistencia</p>
          <input
            type="checkbox"
            className="toggle base-content toggle-md"
            checked={asistencia}
            onChange={(e) => setAsistencia(e.target.checked)}
          />
        </div>
        <div className="flex flex-row justify-between w-40 items-center h-6 gap-6">
          <p>Puntualidad</p>
          <input
            type="checkbox"
            className="toggle base-content toggle-md"
            checked={puntualidad}
            onChange={(e) => setPuntualidad(e.target.checked)}
          />
        </div>
        <div className="flex flex-row justify-between w-40 items-center h-6  gap-6">
          <p>Uniforme</p>
          <input
            type="checkbox"
            className="toggle base-content toggle-md"
            checked={uniforme}
            onChange={(e) => setUniforme(e.target.checked)}
          />
        </div>
        <div className="flex flex-col justify-center items-center">
          <p className="w-full text-center text-2xl font-semibold ">{total}</p>
          <p className="w-full text-center">{totalStr}</p>
          <input
            type="range"
            min={0}
            max="10"
            value={calificacion}
            onChange={(e) => setCalificacion(e.target.value)}
            className="range w-60 my-6"
          />
        </div>

        <button
          className={`h-10 w-60 ${
            estado === "Enviado" ? "bg-gray-600" : "bg-black"
          } text-white rounded-2xl `}
          onClick={() => {
            twenty();
            handleClick();
          }}
          disabled={estado === "Enviado"}
        >
          {estado}
        </button>
        <AiFillPlusCircle
          size={30}
          onClick={handleIncrement}
          color="lightgray"
          className="mt-4"
        />
      </div>
    </div>
  );
}

export default CalCard;
