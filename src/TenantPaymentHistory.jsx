import React, { useState } from "react";
import "./tenantpaymenthistory.css";

const TenantPaymentHistory = () => {
  const payments = [
    { id: 1, date: "2025-01-15", amount: 1200, status: "Paid" },
    { id: 2, date: "2024-12-15", amount: 1200, status: "Paid" },
    { id: 3, date: "2024-11-15", amount: 1200, status: "Paid" },
    { id: 4, date: "2024-10-15", amount: 1200, status: "Due" },
    { id: 5, date: "2024-09-15", amount: 1200, status: "Late" }
  ];

  const [month, setMonth] = useState("");
  const [year, setYear] = useState("");

  const filteredPayments = payments.filter((payment) => {
    const paymentDate = new Date(payment.date);
    const paymentMonth = paymentDate.getMonth() + 1;
    const paymentYear = paymentDate.getFullYear();

    return (
      (month === "" || parseInt(month) === paymentMonth) &&
      (year === "" || parseInt(year) === paymentYear)
    );
  });

  return (
    <div className="payment-history-page">
      <h1 className="page-title">Payment History</h1>

      {/* Filters */}
      <div className="filter-bar">
        <select value={month} onChange={(e) => setMonth(e.target.value)}>
          <option value="">All Months</option>
          <option value="1">January</option>
          <option value="2">February</option>
          <option value="3">March</option>
          <option value="4">April</option>
          <option value="5">May</option>
          <option value="6">June</option>
          <option value="7">July</option>
          <option value="8">August</option>
          <option value="9">September</option>
          <option value="10">October</option>
          <option value="11">November</option>
          <option value="12">December</option>
        </select>

        <select value={year} onChange={(e) => setYear(e.target.value)}>
          <option value="">All Years</option>
          <option value="2025">2025</option>
          <option value="2024">2024</option>
          <option value="2023">2023</option>
        </select>
      </div>

      {/* Table */}
      <div className="history-card">
        <table>
          <thead>
            <tr>
              <th>Date</th>
              <th>Amount</th>
              <th>Status</th>
            </tr>
          </thead>

          <tbody>
            {filteredPayments.length === 0 ? (
              <tr>
                <td colSpan="3" className="no-data">
                  No payment records found
                </td>
              </tr>
            ) : (
              filteredPayments.map((payment) => (
                <tr key={payment.id}>
                  <td>{payment.date}</td>
                  <td>${payment.amount}</td>
                  <td
                    className={
                      payment.status === "Paid"
                        ? "paid"
                        : payment.status === "Late"
                        ? "late"
                        : "due"
                    }
                  >
                    {payment.status}
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default TenantPaymentHistory;
