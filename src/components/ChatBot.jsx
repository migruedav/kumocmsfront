import React, { useState } from "react";
import { RiSendPlane2Fill } from "react-icons/ri";
import { BsWhatsapp } from "react-icons/bs";
import { supabase } from "../supabase";
import { Pinwheel } from "@uiball/loaders";

function ChatBot() {
  const [pregunta, setPregunta] = useState("");
  const [respuesta, setRespuesta] = useState("");
  const [loading, setLoading] = useState(false);

  async function handleButton() {
    setLoading(true);
    setPregunta("");
    const url = `https://kumoback-production.up.railway.app/chatbot?pregunta=${pregunta}`;
    fetch(url)
      .then((res) => res.json())
      .then(async (data) => {
        setRespuesta(data.data);
        setPregunta("");

        await supabase.from("PreguntasWeb").insert([
          {
            pregunta: pregunta,
            respuesta: data.data,
            dispositivo: navigator.userAgent,
          },
        ]);
        setLoading(false);
      });
  }

  function handleKeyDown(event) {
    if (event.key === "Enter") {
      handleButton();
    }
  }

  return (
    <div
      id="informes"
      className="bg-black h-screen w-full flex justify-center items-center"
    >
      <div className="flex flex-col justify-center items-center w-full px-6">
        <h1 className="text-5xl font-bold text-white mb-10">Información</h1>
        <h1 className="text-white text-center mb-4">
          Aquí puedes preguntar sobre cualquier información que necesites
        </h1>
        <p className="text-white opacity-50 text-center">
          Ej. En dónde están ubicados
        </p>
        <p className="text-white opacity-50 text-center">
          Ej. Cuál es el horario para un niño de 6 años
        </p>
        <div></div>
        <div className="flex flex-col md:flex-row w-full justify-center items-center gap-6">
          <input
            type="text"
            className="bg-white text-black w-[80%] h-10 rounded-full my-6 md:my-10 text-center"
            value={pregunta}
            onChange={(e) => setPregunta(e.target.value)}
            onKeyDown={handleKeyDown}
          />
          <button
            className="bg-white rounded-full h-10 w-10 flex justify-center items-center mb-10 md:mb-0"
            onClick={handleButton}
          >
            {loading ? (
              <Pinwheel size={35} lineWeight={3.5} speed={1} color="black" />
            ) : (
              <RiSendPlane2Fill color="black" size={30} />
            )}
          </button>
        </div>
        <p className="text-white w-full md:w-[600px] text-center">
          {respuesta}
        </p>
        {respuesta.includes("WhatsApp") && (
          <BsWhatsapp
            className="cursor-pointer mt-10"
            color="white"
            size={40}
            onClick={() => window.open("http://wa.me/525524499197", "_blank")}
          />
        )}
      </div>
    </div>
  );
}

export default ChatBot;
