import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function LoginRestrito() {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState("");
  const navigate = useNavigate();

  const senhaCorreta = "insumos2024"; // Altere essa senha depois

  const handleLogin = () => {
    if (senha === senhaCorreta) {
      localStorage.setItem("acessoLiberado", "true");
      navigate("/restrito");
    } else {
      setErro("Senha incorreta. Tente novamente.");
    }
  };

  return (
    <div className="max-w-md mx-auto mt-20 p-6 bg-white rounded-xl shadow">
      <h2 className="text-2xl font-bold mb-4">🔐 Acesso Restrito</h2>
      <input
        type="password"
        placeholder="Digite a senha"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
        className="w-full border px-4 py-2 rounded-lg mb-3"
      />
      {erro && <p className="text-red-500 text-sm mb-3">{erro}</p>}
      <button
        onClick={handleLogin}
        className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg w-full"
      >
        Entrar
      </button>
    </div>
  );
}