import React, { useEffect } from "react";
import { BrowserRouter as Router, Routes, Route, useNavigate } from "react-router-dom";
import Estoque from "./pages/Estoque";
import ListaPreco from "./pages/Listapreco";
import AcessoRestrito from "./pages/AcessoRestrito";
import Historico from "./pages/Historico";
import LoginRestrito from "./pages/LoginRestrito";

function Protegido({ children }) {
  const navigate = useNavigate();

  useEffect(() => {
    const acesso = localStorage.getItem("acessoLiberado");
    if (acesso !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  const acesso = localStorage.getItem("acessoLiberado");
  return acesso === "true" ? children : null;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100">
        <header className="bg-white shadow p-4 flex items-center justify-between">
          <div className="flex items-center space-x-2 cursor-pointer" onClick={() => window.location.href = "/"}>
            <img src="/logo.png" alt="Logo" className="h-12 w-auto" />
            <h1 className="text-xl font-bold text-gray-800">GESTÃO RW INSUMOS</h1>
          </div>
        </header>

        <main className="p-6 flex justify-center">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <Card icon="📦" title="Estoque" href="/estoque" />
            <Card icon="💰" title="Lista de Preço" href="/listapreco" />
            <Card icon="🔐" title="Acesso Restrito" href="/login" />
            <Card icon="📚" title="Histórico" href="/historico" />
          </div>
        </main>

        <Routes>
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/listapreco" element={<ListaPreco />} />
          <Route path="/login" element={<LoginRestrito />} />
          <Route
            path="/acesso-restrito"
            element={
              <Protegido>
                <AcessoRestrito />
              </Protegido>
            }
          />
          <Route path="/historico" element={<Historico />} />
        </Routes>
      </div>
    </Router>
  );
}

function Card({ icon, title, href }) {
  return (
    <a
      href={href}
      className="bg-white rounded-lg shadow-md hover:shadow-xl transition p-6 flex flex-col items-center text-center w-40"
    >
      <span className="text-4xl mb-2">{icon}</span>
      <span className="text-sm font-semibold text-gray-700">{title}</span>
    </a>
  );
}