import React, { useEffect, useState } from "react";
import { exportarEstoquePDF } from "../utils/exportarEstoquePdf";

export default function Estoque() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("estoque");
    if (dados) {
      setProdutos(JSON.parse(dados));
    }
  }, []);

  const fornecedoresUnicos = [
    ...new Set(produtos.map((p) => p.fornecedor).filter(Boolean)),
  ];

  const produtosFiltrados = fornecedorSelecionado
    ? produtos.filter((p) => p.fornecedor === fornecedorSelecionado)
    : produtos;

  return (
    <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto mt-8">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">📦 Estoque Atual</h2>
        {produtos.length > 0 && (
          <button
            onClick={() => exportarEstoquePDF(produtosFiltrados)}
            className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg shadow"
          >
            📤 Exportar Estoque
          </button>
        )}
      </div>

      {produtos.length > 0 && (
        <div className="mb-4 flex items-center gap-3">
          <label className="text-sm font-semibold">Filtrar por fornecedor:</label>
          <select
            className="border px-3 py-2 rounded-lg shadow-sm"
            value={fornecedorSelecionado}
            onChange={(e) => setFornecedorSelecionado(e.target.value)}
          >
            <option value="">Todos</option>
            {fornecedoresUnicos.map((f, idx) => (
              <option key={idx} value={f}>
                {f}
              </option>
            ))}
          </select>
        </div>
      )}

      {produtosFiltrados.length === 0 ? (
        <p className="text-center text-gray-500 mt-6">
          Nenhum produto encontrado.
        </p>
      ) : (
        <div className="overflow-x-auto rounded-lg shadow">
          <table className="min-w-full text-sm text-center border border-gray-200">
            <thead className="bg-gray-100 text-gray-700">
              <tr>
                <th className="border px-4 py-2">Produto</th>
                <th className="border px-4 py-2">Fornecedor</th>
                <th className="border px-4 py-2">Unidade</th>
                <th className="border px-4 py-2">Quantidade</th>
              </tr>
            </thead>
            <tbody>
              {produtosFiltrados.map((p, index) => (
                <tr key={index} className="hover:bg-gray-50 transition">
                  <td className="border px-4 py-2">{p.nome}</td>
                  <td className="border px-4 py-2">{p.fornecedor}</td>
                  <td className="border px-4 py-2">{p.unidade}</td>
                  <td className="border px-4 py-2">{p.quantidade}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}