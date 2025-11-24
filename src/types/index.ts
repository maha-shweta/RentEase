export type UserRole = "landlord" | "tenant";

export interface Property {
  id: string;
  name: string;
  address: string;
  type: string;
  rentAmount: number;
  size: string;
  availability: "available" | "occupied";
  tenantName: string | null;
  tenantId: string | null;
}

export interface Tenant {
  id: string;
  name: string;
  email: string;
  phone: string;
  propertyId: string;
  propertyName: string;
  rentAmount: number;
  leaseDuration: number;
  leaseStart: string;
  leaseEnd: string;
  status: string;
}

export interface Payment {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  amount: number;
  status: "paid" | "due" | "overdue";
  dueDate: string;
  paymentDate: string | null;
}

export interface Utility {
  id: string;
  tenantId: string;
  tenantName: string;
  propertyId: string;
  propertyName: string;
  utilityType: "electricity" | "water" | "gas" | "internet";
  amount: number;
  status: "paid" | "unpaid";
  billingDate: string;
}
