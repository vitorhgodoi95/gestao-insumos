import React from "react";
import { BrowserRouter as Router, Routes, Route, Link, Navigate } from "react-router-dom";
import Estoque from "./pages/Estoque";
import ListaPreco from "./pages/Listapreco";
import AcessoRestrito from "./pages/AcessoRestrito";
import Historico from "./pages/Historico";
import LoginRestrito from "./pages/LoginRestrito";
import "./App.css";

function RotaProtegida({ children }) {
  const autenticado = localStorage.getItem("acessoLiberado") === "true";
  return autenticado ? children : <Navigate to="/acesso-restrito" />;
}

export default function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        {/* Cabeçalho */}
        <header className="bg-white shadow px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-3">
            <img src="/logo.png" alt="Logo RW" className="w-12 h-12 object-contain" />
            <Link to="/" className="text-2xl font-bold text-gray-800">
              GESTÃO RW INSUMOS
            </Link>
          </div>
        </header>

        {/* Conteúdo principal */}
        <main className="flex-1 p-6">
          <Routes>
            <Route
              path="/"
              element={
                <div className="flex flex-col items-center justify-center gap-8 mt-10">
                  <Link
                    to="/estoque"
                    className="text-center bg-green-600 text-white px-6 py-3 rounded-xl shadow hover:bg-green-700 transition text-lg w-64"
                  >
                    📦 Estoque
                  </Link>
                  <Link
                    to="/listapreco"
                    className="text-center bg-blue-600 text-white px-6 py-3 rounded-xl shadow hover:bg-blue-700 transition text-lg w-64"
                  >
                    💰 Lista de Preço
                  </Link>
                  <Link
                    to="/acesso-restrito"
                    className="text-center bg-red-600 text-white px-6 py-3 rounded-xl shadow hover:bg-red-700 transition text-lg w-64"
                  >
                    🔒 Acesso Restrito
                  </Link>
                </div>
              }
            />
            <Route path="/estoque" element={<Estoque />} />
            <Route path="/listapreco" element={<ListaPreco />} />
            <Route path="/acesso-restrito" element={<LoginRestrito />} />
            <Route
              path="/restrito"
              element={
                <RotaProtegida>
                  <AcessoRestrito />
                </RotaProtegida>
              }
            />
            <Route path="/historico" element={<Historico />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}