import React, { useState, useEffect } from "react";

export default function EntradaForm() {
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

  const registrarHistorico = (tipo, nome, qtd) => {
    try {
      const historicoAtual = JSON.parse(localStorage.getItem("historicoEstoque")) || [];
      const novoRegistro = {
        tipo,
        produto: nome,
        quantidade: Number(qtd),
        data: new Date().toLocaleString()
      };

      console.log("📝 Registrando no histórico:", novoRegistro);

      historicoAtual.push(novoRegistro);
      localStorage.setItem("historicoEstoque", JSON.stringify(historicoAtual));
      console.log("✅ Histórico salvo com sucesso.");
    } catch (err) {
      console.error("❌ Erro ao salvar histórico:", err);
    }
  };

  const handleEntrada = (e) => {
    e.preventDefault();

    if (!produtoSelecionado || !quantidade) {
      setMensagem("Preencha todos os campos.");
      return;
    }

    console.log("➡️ Entrada:", produtoSelecionado, "Quantidade:", quantidade);

    const novaLista = estoque.map((item) => {
      if (item.nome === produtoSelecionado) {
        const novaQuantidade = Number(item.quantidade) + Number(quantidade);
        return { ...item, quantidade: novaQuantidade };
      }
      return item;
    });

    localStorage.setItem("estoque", JSON.stringify(novaLista));
    registrarHistorico("Entrada", produtoSelecionado, quantidade);

    setEstoque(novaLista);
    setQuantidade("");
    setProdutoSelecionado("");
    setMensagem("✅ Entrada registrada com sucesso!");
  };

  return (
    <form onSubmit={handleEntrada} className="bg-white p-4 rounded shadow mt-6">
      <h3 className="text-lg font-bold mb-4">📥 Dar Entrada no Estoque</h3>

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
        ➕ Registrar Entrada
      </button>

      {mensagem && <p className="text-green-600 mt-2 text-center text-sm">{mensagem}</p>}
    </form>
  );
}