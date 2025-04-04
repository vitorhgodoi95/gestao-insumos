import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Estoque from "./pages/Estoque";
import ListaPreco from "./pages/ListaPreco";
import AcessoRestrito from "./pages/AcessoRestrito";
import Historico from "./pages/Historico";
import LoginRestrito from "./pages/LoginRestrito";

export default function App() {
  return (
    <Router>
      {/* BARRA SUPERIOR COM LOGO AJUSTADO E TÍTULO */}
      <header className="bg-white shadow-md px-6 py-4 flex items-center justify-center">
  <div className="flex items-center space-x-4">
    <img
      src="/logo.png"
      alt="Logo RW"
      className="w-16 h-16 object-contain"
      style={{ maxWidth: "64px", maxHeight: "64px" }}
    />
    <h1 className="text-2xl sm:text-3xl font-bold text-green-800">GESTÃO RW INSUMOS</h1>
  </div>
</header>

      {/* CONTEÚDO CENTRAL */}
      <main className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-6">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-8">
          <Link
            to="/estoque"
            className="bg-white hover:bg-green-50 shadow rounded-xl p-6 flex flex-col items-center text-gray-700 transition"
          >
            <span className="text-4xl mb-2">📦</span>
            <span className="font-medium text-sm text-center">Estoque</span>
          </Link>
          <Link
            to="/lista"
            className="bg-white hover:bg-green-50 shadow rounded-xl p-6 flex flex-col items-center text-gray-700 transition"
          >
            <span className="text-4xl mb-2">💰</span>
            <span className="font-medium text-sm text-center">Lista de Preço</span>
          </Link>
          <Link
            to="/restrito"
            className="bg-white hover:bg-green-50 shadow rounded-xl p-6 flex flex-col items-center text-gray-700 transition"
          >
            <span className="text-4xl mb-2">🔐</span>
            <span className="font-medium text-sm text-center">Acesso Restrito</span>
          </Link>
          <Link
            to="/historico"
            className="bg-white hover:bg-green-50 shadow rounded-xl p-6 flex flex-col items-center text-gray-700 transition"
          >
            <span className="text-4xl mb-2">📚</span>
            <span className="font-medium text-sm text-center">Histórico</span>
          </Link>
        </div>

        {/* ROTAS */}
        <Routes>
          <Route path="/estoque" element={<Estoque />} />
          <Route path="/lista" element={<ListaPreco />} />
          <Route path="/restrito" element={<AcessoRestrito />} />
          <Route path="/historico" element={<Historico />} />
          <Route path="/login" element={<LoginRestrito />} />
        </Routes>
      </main>
    </Router>
  );
}