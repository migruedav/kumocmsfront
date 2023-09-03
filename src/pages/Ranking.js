import React from "react";
import GroupsChips from "../components/GroupsChips";
import { useEffect } from "react";
import { supabase } from "../supabase";
import KoinLogo from "../components/KoinLogo"

function Ranking() {
  const [active, setActive] = React.useState(5);
  const [alumnos, setAlumnos] = React.useState([]);
  const [calendario, setCalendario] = React.useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;
  const puntos_restantes = calendario.length * 20;

  useEffect(() => {
    async function fetchAlumnos() {
      const { data, error } = await supabase
        .from("Alumnos")
        .select("*")
        .filter("Grupo", "eq", active)
        .order("Koins", { ascending: false });
      if (error) {
        console.log(error);
      } else {
        setAlumnos(data);
      }
    }
    fetchAlumnos();
  }, [active]);

  console.log("alumnos", alumnos);
  console.log("calendario", calendario);
  console.log("puntos_restantes", puntos_restantes);

  useEffect(() => {
    async function fetchCalendario() {
      const { data, error } = await supabase
        .from("Calendario")
        .select("*")
        .filter("fecha", "gte", formattedDate);
      if (error) {
        console.log(error);
      } else {
        setCalendario(data);
      }
    }
    fetchCalendario();
  }, []);

  return (
    <div className="bg-black h-screen w-full flex flex-col items-center gap-6 overflow-auto p-5">
      <GroupsChips setActive={setActive} active={active} />
      <div className="flex flex-col gap-4">
        {alumnos.map((alumno) => {
          const score = alumno.Koins;
          const danger_index = ((350 - score) / (calendario.length-9)).toFixed(0);
          const color =
            danger_index < 14
              ? "bg-green-600"
              : danger_index < 16
              ? "bg-yellow-400"
              : danger_index < 18
              ? "bg-orange-400"
              : danger_index < 20
              ? "bg-red-500"
              : "bg-black";
          return (
            <div
              key={alumno.id}
              className="w-80 h-40 bg-gradient-to-l from-white via-gray-200 to-gray-400 rounded-xl flex justify-around items-center p-2"
            >
              <div className="flex justify-center items-center relative w-1/2 h-32">
                <div
                  className={`absolute rounded-full w-28 h-28 ${color}`}
                ></div>
                <div
                  className="absolute w-24 h-24 rounded-full bg-yellow bg-center bg-cover border-4 border-white"
                  style={{ backgroundImage: `url(${alumno.Foto})` }}
                ></div>
              </div>
              <div className="flex flex-col justify-center items-center w-1/2 gap-1">
                <div className="font-semibold">{alumno.Nickname}</div>
                <div className="text-5xl font-semibold flex flex-row gap-2 justify-center items-center">{score}<KoinLogo className="w-10 h-10" fill="#1F2937"/></div>
                

                {/*<div className="bg-gray-800 w-full h-6  flex justify-center items-center text-white">DI : {danger_index}</div>*/}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ranking;
