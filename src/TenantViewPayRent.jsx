import React, { useState } from "react";
import "./tenantviewpayrent.css";
import { ArrowDownTrayIcon } from "@heroicons/react/24/outline";

function TenantViewPayRent() {
  const [paid, setPaid] = useState(false);

  const handlePayment = () => {
    setPaid(true);
  };

  const downloadReceipt = () => {
    const receiptText = `
      Rent Payment Receipt
      ----------------------
      Amount: $1,200
      Due Date: 15th Jan
      Late Fee: $0
      Status: Paid
      Thank you!
    `;

    const blob = new Blob([receiptText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "rent_receipt.txt";
    link.click();
  };

  return (
    <div className="rent-page">

      <h1 className="page-title">View & Pay Rent</h1>

      {/* Rent Summary Section */}
      <div className="rent-summary-card">
        <h2>Rent Summary</h2>

        <ul className="rent-list">
          <li>
            <span>Rent Amount:</span>
            <span>$1,200</span>
          </li>
          <li>
            <span>Due Date:</span>
            <span>15th Jan</span>
          </li>
          <li>
            <span>Late Fee:</span>
            <span>$0</span>
          </li>
        </ul>

        {!paid ? (
          <button className="pay-btn" onClick={handlePayment}>
            Mark as Paid
          </button>
        ) : (
          <p className="paid-label">✔ Rent Paid Successfully</p>
        )}
      </div>

      {/* Payment Status Card */}
      <div className="payment-status-card">
        <h2>Payment Status</h2>

        <p className={paid ? "status-paid" : "status-unpaid"}>
          {paid ? "Paid" : "Unpaid"}
        </p>

        {paid && (
          <button className="receipt-btn" onClick={downloadReceipt}>
            <ArrowDownTrayIcon className="icon" />
            Download Receipt
          </button>
        )}
      </div>

    </div>
  );
}

export default TenantViewPayRent;
