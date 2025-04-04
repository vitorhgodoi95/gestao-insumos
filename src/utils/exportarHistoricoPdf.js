import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";

export function exportarHistoricoPDF(historico) {
  const doc = new jsPDF();

  doc.setFontSize(16);
  doc.text("Histórico de Movimentações de Estoque", 14, 20);

  const dadosTabela = historico.map((item) => [
    item.tipo,
    item.produto,
    item.quantidade,
    item.data
  ]);

  autoTable(doc, {
    head: [["Tipo", "Produto", "Quantidade", "Data"]],
    body: dadosTabela,
    startY: 30,
    theme: "striped",
    styles: { fontSize: 10, halign: "center" },
  });

  doc.save("historico-estoque.pdf");
}