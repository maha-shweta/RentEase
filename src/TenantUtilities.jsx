import React from "react";
import "./tenantutilities.css";
import {
  BoltIcon,
  FireIcon,
  BeakerIcon,
  WifiIcon,
  CurrencyDollarIcon,
} from "@heroicons/react/24/outline";

function TenantUtilities() {
  const utilities = [
    { name: "Electricity", amount: 120, icon: <BoltIcon className="u-icon" /> },
    { name: "Water", amount: 45, icon: <BeakerIcon className="u-icon" /> },
    { name: "Gas", amount: 60, icon: <FireIcon className="u-icon" /> },
    { name: "Internet", amount: 50, icon: <WifiIcon className="u-icon" /> },
  ];

  const total = utilities.reduce((sum, item) => sum + item.amount, 0);
  const isPaid = false; // change to true if paid

  return (
    <div className="utilities-page">

      <h1 className="page-title">Utilities</h1>

      {/* Summary Cards */}
      <div className="utilities-summary">

        <div className="summary-card">
          <CurrencyDollarIcon className="summary-icon" />
          <h3>Total Bill</h3>
          <p>${total}</p>
        </div>

        <div className="summary-card">
          <h3>Payment Status</h3>
          <p className={isPaid ? "status-paid" : "status-unpaid"}>
            {isPaid ? "Paid" : "Unpaid"}
          </p>
        </div>

      </div>

      {/* Utilities Table */}
      <div className="utilities-card">
        <h2>Monthly Utility Charges</h2>

        <table>
          <thead>
            <tr>
              <th>Service</th>
              <th>Charge</th>
            </tr>
          </thead>

          <tbody>
            {utilities.map((item, index) => (
              <tr key={index}>
                <td>
                  <div className="service-name">
                    {item.icon}
                    {item.name}
                  </div>
                </td>
                <td>${item.amount}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}

export default TenantUtilities;
