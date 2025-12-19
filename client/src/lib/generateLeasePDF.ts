import { jsPDF } from 'jspdf';

interface LeaseData {
  id: number;
  tenant_name?: string;
  tenant_email?: string;
  property_address?: string;
  unit_number?: string;
  start_date: string;
  end_date: string;
  rent_amount: number;
  deposit_amount: number;
  status: string;
}

export function generateLeasePDF(lease: LeaseData): void {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();
  
  // Header
  doc.setFillColor(59, 130, 246); // Primary blue
  doc.rect(0, 0, pageWidth, 40, 'F');
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(24);
  doc.setFont('helvetica', 'bold');
  doc.text('RENTAL AGREEMENT', pageWidth / 2, 20, { align: 'center' });
  
  doc.setFontSize(12);
  doc.setFont('helvetica', 'normal');
  doc.text('RentEase Property Management', pageWidth / 2, 32, { align: 'center' });
  
  // Reset text color
  doc.setTextColor(0, 0, 0);
  
  // Agreement ID
  doc.setFontSize(10);
  doc.setTextColor(100, 100, 100);
  doc.text(`Agreement ID: LA-${String(lease.id).padStart(5, '0')}`, 20, 55);
  doc.text(`Generated: ${new Date().toLocaleDateString()}`, pageWidth - 20, 55, { align: 'right' });
  
  // Parties Section
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PARTIES', 20, 70);
  
  doc.setDrawColor(59, 130, 246);
  doc.line(20, 73, pageWidth - 20, 73);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  const landlordY = 82;
  doc.setFont('helvetica', 'bold');
  doc.text('Landlord:', 20, landlordY);
  doc.setFont('helvetica', 'normal');
  doc.text('RentEase Property Management', 55, landlordY);
  
  const tenantY = 92;
  doc.setFont('helvetica', 'bold');
  doc.text('Tenant:', 20, tenantY);
  doc.setFont('helvetica', 'normal');
  doc.text(lease.tenant_name || 'Unknown Tenant', 55, tenantY);
  if (lease.tenant_email) {
    doc.text(`Email: ${lease.tenant_email}`, 55, tenantY + 6);
  }
  
  // Property Section
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('PROPERTY DETAILS', 20, 115);
  doc.line(20, 118, pageWidth - 20, 118);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  doc.setFont('helvetica', 'normal');
  
  doc.setFont('helvetica', 'bold');
  doc.text('Address:', 20, 128);
  doc.setFont('helvetica', 'normal');
  doc.text(lease.property_address || 'Not specified', 55, 128);
  
  doc.setFont('helvetica', 'bold');
  doc.text('Unit:', 20, 138);
  doc.setFont('helvetica', 'normal');
  doc.text(lease.unit_number || 'N/A', 55, 138);
  
  // Lease Terms Section
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('LEASE TERMS', 20, 158);
  doc.line(20, 161, pageWidth - 20, 161);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(11);
  
  const termsData = [
    ['Start Date:', new Date(lease.start_date).toLocaleDateString()],
    ['End Date:', new Date(lease.end_date).toLocaleDateString()],
    ['Monthly Rent:', `BDT ${Number(lease.rent_amount).toLocaleString()}`],
    ['Security Deposit:', `BDT ${Number(lease.deposit_amount).toLocaleString()}`],
    ['Status:', lease.status],
  ];
  
  let termY = 171;
  termsData.forEach(([label, value]) => {
    doc.setFont('helvetica', 'bold');
    doc.text(label, 20, termY);
    doc.setFont('helvetica', 'normal');
    doc.text(value, 70, termY);
    termY += 10;
  });
  
  // Terms and Conditions
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('TERMS AND CONDITIONS', 20, 230);
  doc.line(20, 233, pageWidth - 20, 233);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(9);
  doc.setFont('helvetica', 'normal');
  
  const terms = [
    '1. The Tenant agrees to pay the monthly rent on or before the 1st of each month.',
    '2. The security deposit will be refunded within 30 days after the lease ends, subject to inspection.',
    '3. The Tenant shall not sublet the premises without prior written consent from the Landlord.',
    '4. The Tenant is responsible for maintaining the property in good condition.',
    '5. Either party may terminate this agreement with 30 days written notice.',
    '6. The Tenant agrees to comply with all applicable laws and regulations.',
  ];
  
  let conditionY = 242;
  terms.forEach((term) => {
    doc.text(term, 20, conditionY);
    conditionY += 7;
  });
  
  // Signatures Section
  doc.setTextColor(59, 130, 246);
  doc.setFontSize(14);
  doc.setFont('helvetica', 'bold');
  doc.text('SIGNATURES', 20, conditionY + 10);
  doc.line(20, conditionY + 13, pageWidth - 20, conditionY + 13);
  
  doc.setTextColor(0, 0, 0);
  doc.setFontSize(10);
  
  const signY = conditionY + 30;
  
  // Landlord signature
  doc.line(20, signY, 80, signY);
  doc.setFont('helvetica', 'normal');
  doc.text('Landlord Signature', 20, signY + 5);
  doc.text('Date: ____________', 20, signY + 12);
  
  // Tenant signature
  doc.line(pageWidth - 80, signY, pageWidth - 20, signY);
  doc.text('Tenant Signature', pageWidth - 80, signY + 5);
  doc.text('Date: ____________', pageWidth - 80, signY + 12);
  
  // Footer
  doc.setFontSize(8);
  doc.setTextColor(128, 128, 128);
  doc.text('This document was generated by RentEase Property Management System.', pageWidth / 2, 285, { align: 'center' });
  
  // Save the PDF
  const filename = `Lease_Agreement_${lease.tenant_name?.replace(/\s+/g, '_') || 'Unknown'}_${lease.id}.pdf`;
  doc.save(filename);
}

export function downloadLeasePDF(lease: LeaseData): void {
  generateLeasePDF(lease);
}
