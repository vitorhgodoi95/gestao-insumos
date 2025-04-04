import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportarEstoquePDF(estoque) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Relatório de Estoque Atual", 14, 20);

  const dadosTabela = estoque.map((item) => [
    item.nome,
    item.fornecedor,
    item.unidade,
    item.quantidade
  ]);

  autoTable(doc, {
    head: [["Produto", "Fornecedor", "Unidade", "Quantidade"]],
    body: dadosTabela,
    startY: 30,
    theme: "striped",
    styles: { fontSize: 10, halign: "center" },
  });

  doc.save("estoque-atual.pdf");
}