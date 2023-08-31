import React, { useEffect } from "react";
import { Switch } from "@nextui-org/react";
import { DatePicker, DatePickerValue } from "@tremor/react";
import { AiFillPlusCircle } from "react-icons/ai";
import { supabase } from "../supabase";
import { Select, SelectItem } from "@tremor/react";

function Calificar() {
  const [asistencia, setAsistencia] = React.useState(true);
  const [puntualidad, setPuntualidad] = React.useState(true);
  const [uniforme, setUniforme] = React.useState(true);
  const [calificacion, setCalificacion] = React.useState("5");
  const [total, setTotal] = React.useState(0);
  const [date, setDate] = React.useState(new Date());
  const [totalStr, setTotalStr] = React.useState("");
  const [programa, setPrograma] = React.useState("Kobudo");

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
    else if (calificacion == 10) totalStr = "Excelente";
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
        data[0] ? setPrograma(data[0].programa) : setPrograma("Kata");
      }
    }
    fetchData();
  }, []);

  return (
    <div className="bg-black h-screen w-full flex justify-center items-center">
      <div className="bg-white w-[350px] h-5/6 rounded-2xl flex flex-col justify-center items-center gap-3">
        <div
          className="h-40 w-40 bg-yellow-500 rounded-full bg-contain bg-center bg-no-repeat mb-4"
          style={{
            backgroundImage: `url("https://cdn.iconscout.com/icon/free/png-256/free-avatar-370-456322.png?f=webp")`,
          }}
        ></div>
        <h1 className="text-2xl font-semibold">Mick</h1>
        <Select value={programa} className="w-60 z-10 flex">
          <SelectItem value="Kata" className="text-red-500 w-full text-center">Kata</SelectItem>
          <SelectItem value="Kobudo">Kobudo</SelectItem>
          <SelectItem value="Kumite">Kumite</SelectItem>
          <SelectItem value="AntiBullying">Anti Bullying</SelectItem>
        </Select>
        <DatePicker
          className="w-60 mb-2"
          value={date}
          onValueChange={(e) => {
            setDate(e);
          }}
        />

        <div className="flex flex-row justify-between w-40 items-center h-6 gap-6">
          <p>Asistencia</p>
          <Switch
            size="sm"
            isSelected={asistencia}
            onValueChange={setAsistencia}
          ></Switch>
        </div>
        <div className="flex flex-row justify-between w-40 items-center h-6 gap-6">
          <p>Puntualidad</p>
          <Switch
            size="sm"
            isSelected={puntualidad}
            onValueChange={setPuntualidad}
          ></Switch>
        </div>
        <div className="flex flex-row justify-between w-40 items-center h-6  gap-6">
          <p>Uniforme</p>
          <Switch
            size="sm"
            isSelected={uniforme}
            onValueChange={setUniforme}
          ></Switch>
        </div>
        <div className="flex flex-col justify-center items-center">
          <input
            type="range"
            list="tickmarks"
            min={0}
            max={10}
            step={1}
            onChange={(e) => setCalificacion(e.target.value)}
            className="w-60 my-4"
            value={calificacion}
          />
          <p className="w-full text-center">{totalStr}</p>
        </div>
        <p className="w-full text-center text-2xl font-semibold ">{total}</p>
        <button className="h-10 w-60 bg-black text-white rounded-2xl">
          Enviar
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

export default Calificar;
