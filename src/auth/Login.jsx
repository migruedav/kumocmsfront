import React, { useState } from "react";
import Logo from "../components/Logo";
import { supabase } from "../supabase";
import { useNavigate } from "react-router-dom";
import { useStore } from "../store/Store";



function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();
  const setUser = useStore((state) => state.setUser);

  const handleSubmit = async (event) => {
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (error) {
      alert(error.message);
    } else if (data.user && data.user.email) {
      setUser(data.user);
      navigate("/");
    }
  };

  return (
    <div className="w-full h-screen flex justify-center items-center bg-black fixed inset-0">
      <div className="relative opacity-100 flex flex-col justify-center items-center w-[300px] h-96 bg-gray-100 rounded-2xl gap-6 shadow-2xl shadow-black">
        <Logo className="w-20 h-20" fill={"red"} />
        <input
          type="text"
          placeholder="Nombre"
          className="active:border-red-500 h-8 text-center rounded-full w-5/6 border-gray-200 border"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          className="h-8 text-center rounded-full w-5/6 border-gray-200 border"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          className="bg-RojoKumo h-10 w-5/6 text-white rounded-full"
          onClick={() => handleSubmit()}
        >
          Ingresar
        </button>
      </div>
    </div>
  );
}

export default Login;
