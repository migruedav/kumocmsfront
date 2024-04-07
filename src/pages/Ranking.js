import React from "react";
import { useEffect, useMemo } from "react";
import { supabase } from "../supabase";
import GroupsChipsMulti from "../components/GroupsChipsMulti";

function Ranking() {
  const [active5, setActive5] = React.useState(false);
  const [active6, setActive6] = React.useState(false);
  const [active7, setActive7] = React.useState(false);
  const [alumnos, setAlumnos] = React.useState([]);
  const [calendario, setCalendario] = React.useState([]);

  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, "0");
  const day = String(today.getDate()).padStart(2, "0");
  const formattedDate = `${year}-${month}-${day}`;

  const actives = useMemo(() => {
    const arr = [];
    if (active5) {
      arr.push(5);
    }
    if (active6) {
      arr.push(6);
    }
    if (active7) {
      arr.push(7);
    }
    return arr;
  }, [active5, active6, active7]);

  useEffect(() => {
    async function fetchAlumnos() {
      const { data, error } = await supabase
        .from("Alumnos")
        .select("*")
        .in("Grupo", actives)
        .order("Koins", { ascending: false });
      if (error) {
        console.log(error);
      } else {
        setAlumnos(data);
      }
    }
    fetchAlumnos();
  }, [actives]);

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
  }, [formattedDate]);

  return (
    <div className="bg-black h-screen w-full flex flex-col items-center gap-6 overflow-auto pt-5 pb-20">
      <GroupsChipsMulti
        active5={active5}
        setActive5={setActive5}
        active6={active6}
        setActive6={setActive6}
        active7={active7}
        setActive7={setActive7}
      />
      <div className="flex flex-col gap-4">
        <div className="w-full text-center text-white">Faltan {calendario.length} clases para terminar el periodo</div>
        {alumnos.map((alumno) => {
          const score = alumno.Koins;
          const danger_index = ((360 - (score+20)) / (calendario.length)).toFixed(1);
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
                <div className="font-bold text-2xl">{alumno.Nickname}</div>
                <div className="text-5xl font-semibold flex flex-row gap-2 justify-center items-center">
                  <img className="w-8 rounded-full" src="https://res.cloudinary.com/dt9ivv2ug/image/upload/v1693943730/Captura_de_Pantalla_2023-09-05_a_la_s_13.55.09_fwx4dh.png" alt="Koins" />
                  {score+20}
                </div>
                  Danger Index : {danger_index}

              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default Ranking;
