import React, { useEffect } from "react";
import { supabase } from "../supabase";
import CalCard from "../components/CalCard";

function Calificar() {
  const [data, setData] = React.useState([]);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("Alumnos").select("*");
      if (error) {
        console.log(error);
      } else {
        setData(data);
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-black h-screen w-full flex flex-col items-center gap-6 overflow-auto p-5">
      {data.map((alumno) => (
        <CalCard
          key={alumno.id}
          id={alumno.id}
          Nickname={alumno.Nickname}
          Foto={alumno.Foto}
          Grupo={alumno.Grupo}
        />
      ))}
    </div>
  );
}

export default Calificar;
