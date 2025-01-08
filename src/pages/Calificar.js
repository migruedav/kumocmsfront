import React, { useEffect } from "react";
import { supabase } from "../supabase";
import CalCard from "../components/CalCard";
import GroupsChips from "../components/GroupsChips";


function Calificar() {
  const [data, setData] = React.useState([]);
  const [active, setActive] = React.useState(5);
  const [programa, setPrograma] = React.useState("Kobudo");


  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase.from("Alumnos").select("*").eq('Activo', true).filter("Grupo", "eq", active).order("Nickname", { ascending: true });
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
      <GroupsChips setActive={setActive} active={active} />
      {data.map((alumno) => (
        <CalCard
          key={alumno.id}
          id={alumno.id}
          Nickname={alumno.Nickname}
          Foto={alumno.Foto}
          Grupo={alumno.Grupo}
          programa={programa}
        />
      ))}
    </div>
  );
}

export default Calificar;
