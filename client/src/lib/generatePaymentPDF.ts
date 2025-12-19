import { jsPDF } from 'jspdf';

interface PaymentData {
  id: number;
  rental_agreement_id: number;
  amount: number;
  due_date?: string;
  paid_at?: string;
  payment_status: 'Paid' | 'Pending' | 'Overdue';
  tenant_name?: string;
  unit_number?: string;
  property_address?: string;
}

export function generatePaymentReceiptPDF(payment: PaymentData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(59, 130, 246); // Blue for payments
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT RECEIPT', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('RentEase Property Management', pageWidth / 2, 32, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Receipt ID and Date
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Receipt No: PR-${String(payment.id).padStart(5, '0')}`, 20, 55);
  doc.text(`Date: ${new Date().toLocaleDateString()}`, pageWidth - 20, 55, { align: 'right' });
  
  // Status Badge
  const statusColors: Record<string, [number, number, number]> = {
    Paid: [34, 197, 94],
    Pending: [234, 179, 8],
    Overdue: [239, 68, 68]
  };
  const statusColor = statusColors[payment.payment_status] || [100, 100, 100];
  
  doc.setFillColor(statusColor[0], statusColor[1], statusColor[2]);
  doc.roundedRect(pageWidth / 2 - 25, 60, 50, 15, 3, 3, 'F');
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(10);
  doc.setFont('helvetica', 'bold');
  doc.text(payment.payment_status.toUpperCase(), pageWidth / 2, 70, { align: 'center' });
  
  // Tenant Details Section
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TENANT INFORMATION', 20, 95);
  doc.setDrawColor(59, 130, 246);
  doc.line(20, 98, pageWidth - 20, 98);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Tenant:', 20, 110);
  doc.setFont('helvetica', 'normal');
  doc.text(payment.tenant_name || 'Unknown Tenant', 55, 110);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Property:', 20, 122);
  doc.setFont('helvetica', 'normal');
  doc.text(payment.property_address || 'Not specified', 55, 122);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Unit:', 20, 134);
  doc.setFont('helvetica', 'normal');
  doc.text(payment.unit_number || 'N/A', 55, 134);
  
  // Payment Details Section
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PAYMENT DETAILS', 20, 160);
  doc.line(20, 163, pageWidth - 20, 163);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  
  const paymentData = [
    ['Agreement ID:', `RA-${String(payment.rental_agreement_id).padStart(5, '0')}`],
    ['Due Date:', payment.due_date ? new Date(payment.due_date).toLocaleDateString() : 'N/A'],
    ['Payment Date:', payment.paid_at ? new Date(payment.paid_at).toLocaleDateString() : 'Not yet paid'],
  ];
  
  let paymentY = 175;
  paymentData.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 20, paymentY);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 70, paymentY);
    paymentY += 12;
  });
  
  // Amount Box
  doc.setFillColor(239, 246, 255); // Light blue background
  doc.roundedRect(20, 215, pageWidth - 40, 45, 5, 5, 'F');
  
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(12);
  doc.setFont('helvetica', 'bold');
  doc.text('AMOUNT ' + (payment.payment_status === 'Paid' ? 'RECEIVED' : 'DUE'), pageWidth / 2, 230, { align: 'center' });
  
  doc.setFontSize(28);
  doc.text(`BDT ${Number(payment.amount).toLocaleString()}`, pageWidth / 2, 252, { align: 'center' });
  
  // Thank you message for paid
  if (payment.payment_status === 'Paid') {
    doc.setTextColor(34, 197, 94);
    doc.setFontSize(14);
    doc.setFont('helvetica', 'bold');
    doc.text('Thank you for your payment!', pageWidth / 2, 275, { align: 'center' });
  }
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This is a computer-generated receipt and does not require a signature.', pageWidth / 2, 285, { align: 'center' });
  doc.text('RentEase Property Management System', pageWidth / 2, 292, { align: 'center' });
  
  // Save the PDF
  const filename = `Payment_Receipt_${payment.tenant_name?.replace(/\s+/g, '_') || 'Unknown'}_${payment.id}.pdf`;
  doc.save(filename);
}
