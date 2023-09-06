import React, { useState, useEffect } from "react";
import ProfilePhoto from "../components/ProfilePhoto";
import { Select, SelectItem } from "@tremor/react";
import { supabase } from "../supabase";

function EditarAlumno() {
  const [nicknames, setNicknames] = useState([]);
  const [alumnoNickname, setAlumnoNickname] = useState("");
  const [foto, setFoto] = useState("");

  useEffect(() => {
    const fetchAlumno = async () => {
      const { data, error } = await supabase
        .from("Alumnos")
        .select("Nickname")
        .order("Nickname", { ascending: true });
      if (error) console.log("error", error);
      else {
        const nicks = [];
        data.forEach((element) => {
          nicks.push(element.Nickname);
        });
        setNicknames(nicks);
      }
    };
    fetchAlumno();
  }, []);

  const handleSelectChange = (event) => {
    const value = event.target.value;
    if (value) {
      setAlumnoNickname(value);
    }
  };

  async function handleSubmit(e) {
    e.preventDefault();

    const { data, error } = await supabase
      .from("Alumnos")
      .update({ Foto: `https://nkbchoashjdmtmocitad.supabase.co/storage/v1/object/public/Photos/${foto}`})
      .eq("Nickname", alumnoNickname) 
      .select();

    if (error) {
      console.log(error);
    }
    alert("Alumno editado");
    window.location.reload();
  }

  return (
    <div className="flex w-full flex-col justify-center items-center">
      <div className="mt-6 w-full flex justify-center items-center">
        <Select
          placeholder="Alumno"
          onChange={(e) => setAlumnoNickname(e)}
          className="w-40 mb-10"
        >
          {nicknames &&
            nicknames.map((nickname) => (
              <SelectItem value={nickname} key={nickname}>
                {nickname}
              </SelectItem>
            ))}
        </Select>
      </div>
      <ProfilePhoto setFoto={setFoto} nickname={alumnoNickname}/>
      <button
        className="bg-RojoKumo w-60 h-10 rounded-lg text-white text-center mt-6"
        onClick={handleSubmit}
      >
        Editar Alumno
      </button>
    </div>
  );
}

export default EditarAlumno;
