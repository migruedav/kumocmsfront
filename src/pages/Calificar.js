import React, { useEffect, useRef, useState } from "react";
import { supabase } from "../supabase";
import CalCard from "../components/CalCard";
import GroupsChips from "../components/GroupsChips";

function Calificar() {
  const [data, setData] = React.useState([]);
  const [active, setActive] = React.useState(5);
  const [programa, setPrograma] = React.useState("Kobudo");
  const [showUpButton, setShowUpButton] = useState(false);
  const containerRef = useRef(null);

  useEffect(() => {
    async function fetchData() {
      const { data, error } = await supabase
        .from("Alumnos")
        .select("*")
        .eq("Activo", true)
        .filter("Grupo", "eq", active)
        .order("Nickname", { ascending: true });
      if (error) {
        console.log(error);
      } else {
        setData(data);
      }
    }
    fetchData();
  }, [active]);

  useEffect(() => {
    const handleScroll = () => {
      if (containerRef.current) {
        setShowUpButton(containerRef.current.scrollTop > 200);
      }
    };

    const container = containerRef.current;
    container.addEventListener("scroll", handleScroll);
    return () => {
      container.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const goUp = () => {
    if (containerRef.current) {
      containerRef.current.scrollTo({ top: 0, behavior: "smooth" });
    }
  };

  return (
    <div
      ref={containerRef}
      className="main bg-black h-screen w-full flex flex-col items-center gap-6 overflow-auto p-5 pb-20"
    >
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

      {showUpButton && (
        <button
          onClick={goUp}
          className="rounded-full p-2 bg-RojoKumo text-white mb-40"
        >
          Up
        </button>
      )}
    </div>
  );
}

export default Calificar;
