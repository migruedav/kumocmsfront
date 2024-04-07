import React, { useEffect } from "react";
import { supabase } from "../supabase";
import CalCard from "../components/CalCard";
import GroupsChips from "../components/GroupsChips";


function Calificar() {
  const [data, setData] = React.useState([]);
  const [active, setActive] = React.useState(5);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("Alumnos").select("*").eq('Activo',true).filter("Grupo", "eq", active).order("Nickname", { ascending: true });
      if (error) {
        console.log(error);
      } else {
        setData(data);
      }
    }
    fetchData();
  }, [active]);

  return (
    <div className="bg-black h-screen w-full flex flex-col items-center gap-6 overflow-auto p-5 pb-20">
      <GroupsChips setActive={setActive} active={active}/>
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
