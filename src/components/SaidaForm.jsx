import React, { useState, useEffect } from "react";

export default function SaidaForm() {
  const [estoque, setEstoque] = useState([]);
  const [produtoSelecionado, setProdutoSelecionado] = useState("");
  const [quantidade, setQuantidade] = useState("");
  const [mensagem, setMensagem] = useState("");

  useEffect(() => {
    const dados = localStorage.getItem("estoque");
    if (dados) {
      setEstoque(JSON.parse(dados));
    }
  }, []);

  const handleSaida = (e) => {
    e.preventDefault();

    if (!produtoSelecionado || !quantidade) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    console.log("➡️ Produto selecionado:", produtoSelecionado);
    console.log("➡️ Quantidade solicitada:", quantidade);

    const novaLista = estoque.map((item) => {
      if (item.nome === produtoSelecionado) {
        const novaQtd = Number(item.quantidade) - Number(quantidade);
        if (novaQtd < 0) {
          setMensagem("❌ Estoque insuficiente!");
          console.warn("Tentativa de retirada maior que o disponível.");
          return item;
        }
        return { ...item, quantidade: novaQtd };
      }
      return item;
    });

    const produtoAtualizado = novaLista.find((p) => p.nome === produtoSelecionado);

    if (produtoAtualizado.quantidade < 0) {
      setMensagem("❌ Estoque insuficiente!");
      return;
    }

    localStorage.setItem("estoque", JSON.stringify(novaLista));
    setEstoque(novaLista);
    setProdutoSelecionado("");
    setQuantidade("");
    setMensagem("✅ Saída registrada com sucesso!");

    console.log("🟢 Estoque atualizado:", novaLista);
  };

  return (
    <form onSubmit={handleSaida} className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-bold mb-4">📤 Dar Saída do Estoque</h3>

      <select
        className="input mb-4"
        value={produtoSelecionado}
        onChange={(e) => setProdutoSelecionado(e.target.value)}
      >
        <option value="">Selecione um produto</option>
        {estoque.map((item, index) => (
          <option key={index} value={item.nome}>
            {item.nome}
          </option>
        ))}
      </select>

      <input
        type="number"
        className="input mb-4"
        placeholder="Quantidade"
        value={quantidade}
        onChange={(e) => setQuantidade(e.target.value)}
      />

      <button type="submit" className="btn w-full">
        ➖ Registrar Saída
      </button>

      {mensagem && (
        <p
          className={`mt-2 text-center text-sm ${
            mensagem.includes("❌") ? "text-red-600" : "text-green-600"
          }`}
        >
          {mensagem}
        </p>
      )}
    </form>
  );
}