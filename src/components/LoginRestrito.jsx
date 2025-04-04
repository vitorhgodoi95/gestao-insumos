import React, { useState } from "react";

export default function LoginRestrito({ onAutenticar }) {
  const [senha, setSenha] = useState("");
  const [erro, setErro] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (senha === "agro123") {
      onAutenticar();
    } else {
      setErro(true);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded shadow max-w-sm mx-auto mt-12">
      <h2 className="text-xl font-bold mb-4 text-center">🔐 Acesso Restrito</h2>
      <input
        type="password"
        placeholder="Digite a senha"
        className="input mb-3"
        value={senha}
        onChange={(e) => setSenha(e.target.value)}
      />
      <button type="submit" className="btn w-full">Entrar</button>
      {erro && <p className="text-red-600 text-sm mt-2 text-center">Senha incorreta.</p>}
    </form>
  );
}