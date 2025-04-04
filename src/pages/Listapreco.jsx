import React, { useEffect, useState } from "react";

export default function ListaPreco() {
  const [produtos, setProdutos] = useState([]);
  const [fornecedorSelecionado, setFornecedorSelecionado] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("listaPrecos");
    if (dados) {
      setProdutos(JSON.parse(dados));
    }
  }, []);

  const fornecedoresUnicos = [
    ...new Set(produtos.map((p) => p.Fornecedor).filter(Boolean)),
  ];

  const produtosFiltrados = fornecedorSelecionado
    ? produtos.filter((p) => p.Fornecedor === fornecedorSelecionado)
    : produtos;

  return (
    <div className="px-4 sm:px-6 lg:px-8 mt-8">
      <div className="bg-white p-6 rounded-xl shadow max-w-6xl mx-auto">
        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-6 gap-4">
          <h2 className="text-2xl font-bold">💰 Lista de Preço</h2>
          {produtos.length > 0 && (
            <div className="flex items-center gap-3">
              <label className="text-sm font-semibold">
                Filtrar por fornecedor:
              </label>
              <select
                className="w-full sm:w-auto border px-3 py-2 rounded-lg shadow-sm"
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
        </div>

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
                  {[10, 9, 8, 7, 6].map((comissao) => (
                    <th key={comissao} className="border px-4 py-2">
                      {comissao}% Comissão
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {produtosFiltrados.map((p, index) => (
                  <tr key={index} className="hover:bg-gray-50 transition">
                    <td className="border px-4 py-2">{p.Produto}</td>
                    <td className="border px-4 py-2">{p.Fornecedor}</td>
                    {[10, 9, 8, 7, 6].map((c) => (
                      <td key={c} className="border px-4 py-2">
                        {p[`${c}% Comissão`] || "—"}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}