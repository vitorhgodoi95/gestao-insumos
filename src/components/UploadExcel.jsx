import React, { useState } from "react";
import * as XLSX from "xlsx";

export default function UploadExcel({ onUpload }) {
  const [arquivoSelecionado, setArquivoSelecionado] = useState(null);
  const [dadosTemporarios, setDadosTemporarios] = useState([]);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setArquivoSelecionado(file);

    const reader = new FileReader();
    reader.onload = (e) => {
      const data = new Uint8Array(e.target.result);
      const workbook = XLSX.read(data, { type: "array" });
      const sheetName = workbook.SheetNames[0];
      const worksheet = workbook.Sheets[sheetName];
      const json = XLSX.utils.sheet_to_json(worksheet);

      const produtosComComissoes = json.map((row) => {
        const precoBruto = row["Preço Base"];
        const precoBase =
          typeof precoBruto === "string"
            ? parseFloat(precoBruto.replace("R$", "").replace(",", ".").trim())
            : parseFloat(precoBruto);

        if (!isNaN(precoBase)) {
          row["10% Comissão"] = `R$ ${(precoBase * 1.10).toFixed(2)}`;
          row["9% Comissão"] = `R$ ${(precoBase * 1.09).toFixed(2)}`;
          row["8% Comissão"] = `R$ ${(precoBase * 1.08).toFixed(2)}`;
          row["7% Comissão"] = `R$ ${(precoBase * 1.07).toFixed(2)}`;
          row["6% Comissão"] = `R$ ${(precoBase * 1.06).toFixed(2)}`;
        } else {
          row["10% Comissão"] =
            row["9% Comissão"] =
            row["8% Comissão"] =
            row["7% Comissão"] =
            row["6% Comissão"] =
              "—";
        }

        return row;
      });

      setDadosTemporarios(produtosComComissoes);
    };

    reader.readAsArrayBuffer(file);
  };

  const confirmarUpload = () => {
    localStorage.setItem("listaPrecos", JSON.stringify(dadosTemporarios));
    if (onUpload) onUpload(dadosTemporarios);
    alert("Lista de preços atualizada com sucesso!");
    setArquivoSelecionado(null);
  };

  return (
    <div className="my-4">
      <label className="block mb-2 font-medium text-gray-700">
        📄 Importar Lista de Preço (.xlsx)
      </label>
      <input
        type="file"
        accept=".xlsx, .xls"
        onChange={handleFileChange}
        className="block w-full text-sm text-gray-500 file:mr-4 file:py-2 file:px-4
          file:rounded-full file:border-0
          file:text-sm file:font-semibold
          file:bg-blue-50 file:text-blue-700
          hover:file:bg-blue-100"
      />

      {arquivoSelecionado && (
        <button
          onClick={confirmarUpload}
          className="mt-4 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition"
        >
          ✅ Confirmar Upload
        </button>
      )}
    </div>
  );
}