import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import EntradaForm from "../components/EntradaForm";
import SaidaForm from "../components/SaidaForm";
import UploadExcel from "../components/UploadExcel";

export default function AcessoRestrito() {
  const navigate = useNavigate();

  useEffect(() => {
    const autorizado = localStorage.getItem("acessoLiberado");
    console.log("Acesso permitido?", autorizado);

    if (autorizado !== "true") {
      navigate("/login");
    }
  }, [navigate]);

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-5xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">🔐 Área Restrita</h2>

      <div className="grid gap-6">
        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">📥 Entrada de Produtos</h3>
          <EntradaForm />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">📤 Saída de Produtos</h3>
          <SaidaForm />
        </div>

        <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
          <h3 className="font-semibold mb-2">📊 Upload de Lista de Preço (.xlsx)</h3>
          <UploadExcel />
        </div>
      </div>
    </div>
  );
}