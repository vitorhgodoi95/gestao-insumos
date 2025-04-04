import React, { useEffect, useState } from "react";
import { exportarHistoricoPDF } from "../utils/exportarHistoricoPdf";

export default function Historico() {
  const [movimentos, setMovimentos] = useState([]);

  useEffect(() => {
    const dados = localStorage.getItem("historicoMovimentacoes");
    if (dados) {
      setMovimentos(JSON.parse(dados));
    }
  }, []);

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-5xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📚 Histórico de Movimentações</h2>
        {movimentos.length > 0 && (
          <button
            onClick={() => exportarHistoricoPDF(movimentos)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            📄 Exportar PDF
          </button>
        )}
      </div>

      {movimentos.length === 0 ? (
        <p className="text-gray-500 text-center mt-6">Nenhuma movimentação registrada.</p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full text-sm text-center border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">Tipo</th>
                <th className="border px-4 py-2">Produto</th>
                <th className="border px-4 py-2">Fornecedor</th>
                <th className="border px-4 py-2">Unidade</th>
                <th className="border px-4 py-2">Quantidade</th>
                <th className="border px-4 py-2">Data</th>
              </tr>
            </thead>
            <tbody>
              {movimentos.map((m, i) => (
                <tr key={i} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">{m.tipo}</td>
                  <td className="border px-4 py-2">{m.nome}</td>
                  <td className="border px-4 py-2">{m.fornecedor}</td>
                  <td className="border px-4 py-2">{m.unidade}</td>
                  <td className="border px-4 py-2">{m.quantidade}</td>
                  <td className="border px-4 py-2">{m.data}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}