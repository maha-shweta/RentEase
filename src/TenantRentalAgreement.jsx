import React, { useState } from "react";
import "./tenantrentalagreement.css";
import {
  DocumentTextIcon,
  ArrowDownTrayIcon,
  CalendarDaysIcon,
  ExclamationTriangleIcon,
} from "@heroicons/react/24/outline";

function TenantRentalAgreement() {
  const [expiryDate] = useState("31 December 2025");

  const handleDownload = () => {
    const leaseText = `
      SIGNED RENTAL AGREEMENT
      ----------------------------
      Tenant Name: John Doe
      Property: Flat 3B, ABC Residency

      Lease Start: 01 January 2024
      Lease End: 31 December 2025

      Monthly Rent: $1,200
      Status: Active
    `;

    const blob = new Blob([leaseText], { type: "text/plain" });
    const url = URL.createObjectURL(blob);

    const link = document.createElement("a");
    link.href = url;
    link.download = "Signed_Rental_Agreement.txt";
    link.click();
  };

  return (
    <div className="agreement-page">

      <h1 className="page-title">Rental Agreement</h1>

      <div className="agreement-grid">

        {/* Document Card */}
        <div className="agreement-card">
          <div className="card-header">
            <DocumentTextIcon className="card-icon" />
            <h2>Signed Lease Document</h2>
          </div>

          <p className="card-subtext">
            Your official signed lease agreement is ready to view or download.
          </p>

          <div className="button-group">
            <button className="view-btn">
              View Document
            </button>

            <button className="download-btn" onClick={handleDownload}>
              <ArrowDownTrayIcon className="icon" />
              Download
            </button>
          </div>
        </div>

        {/* Expiry Card */}
        <div className="agreement-card">
          <div className="card-header">
            <CalendarDaysIcon className="card-icon" />
            <h2>Lease Expiry Date</h2>
          </div>

          <p className="expiry-date">{expiryDate}</p>
        </div>

        {/* Renewal Notice Card */}
        <div className="agreement-card warning">
          <div className="card-header">
            <ExclamationTriangleIcon className="card-icon warning-icon" />
            <h2>Renewal Notice</h2>
          </div>

          <p className="renew-text">
            Your lease is approaching its expiry date.  
            Please contact the landlord if you wish to **renew**.
          </p>
        </div>

      </div>
    </div>
  );
}

export default TenantRentalAgreement;
