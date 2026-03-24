import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

/**
 * ReportGenerator.js
 * Xera un informe PDF detallado do experimento.
 */

export async function generatePDFReport(tubes, achievements) {
  const doc = new jsPDF();
  const timestamp = new Date().toLocaleString('gl-ES');

  // Cabeceira
  doc.setFontSize(22);
  doc.setTextColor(124, 58, 237); // Cor brand (#7c3aed)
  doc.text("INFORME DE LABORATORIO: LE CHÂTELIER", 10, 20);
  
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Data: ${timestamp}`, 10, 28);
  doc.line(10, 32, 200, 32);

  // Resumo de Logros
  doc.setFontSize(14);
  doc.setTextColor(0, 0, 0);
  doc.text("Logros Alcanzados:", 10, 45);
  doc.setFontSize(10);
  if (achievements.length > 0) {
    achievements.forEach((a, index) => {
      doc.text(`- ${a}`, 15, 52 + (index * 6));
    });
  } else {
    doc.text("Ningún logro rexistrado aínda.", 15, 52);
  }

  // Datos dos Tubos
  let yPos = 80;
  doc.setFontSize(14);
  doc.text("Estado dos Tubos de Ensaio:", 10, yPos);
  yPos += 10;

  tubes.forEach((tube, index) => {
    if (yPos > 250) {
      doc.addPage();
      yPos = 20;
    }

    doc.setFontSize(12);
    doc.setTextColor(124, 58, 237);
    doc.text(`${tube.title} (${tube.type})`, 10, yPos);
    
    doc.setFontSize(10);
    doc.setTextColor(0, 0, 0);
    doc.text(`- pH Final: ${tube.ph.toFixed(2)}`, 15, yPos + 6);
    doc.text(`- % de Produto no equilibrio: ${(tube.equilibriumRatio * 100).toFixed(0)}%`, 15, yPos + 12);
    
    const reagents = tube.history.map(h => h.reagent).join(", ");
    doc.text(`- Reactivos engadidos: ${reagents || "Ningunha"}`, 15, yPos + 18);
    
    yPos += 30;
  });

  // Nota pedagóxica
  doc.setFontSize(10);
  doc.setFont("helvetica", "italic");
  doc.setTextColor(150, 150, 150);
  doc.text("Este informe foi xerado automaticamente polo Laboratorio Virtual Premium.", 10, 285);

  // Gardar
  doc.save(`Lab_LeChatelier_${Date.now()}.pdf`);
}
