import React, { useState } from "react";
import "./tenantdashboard.css";
import TenantDashboardTopbar from "./tenantDashboardTopbar";
import TenantViewPayRent from "./TenantViewPayRent";
import TenantPaymentHistory from "./TenantPaymentHistory";
import TenantRentalAgreement from "./TenantRentalAgreement";
import TenantUtilities from "./TenantUtilities";





import {
  HomeIcon,
  CreditCardIcon,
  ClockIcon,
  DocumentDuplicateIcon,
  WrenchScrewdriverIcon,
  MegaphoneIcon,
  BuildingOfficeIcon,
  UserIcon,
  ArrowLeftOnRectangleIcon,
} from "@heroicons/react/24/outline";

function TenantDashboard() {

  const [activeMenu, setActiveMenu] = useState("Dashboard");

  return (
    <div className="tenant-dashboard">

      {/* Sidebar */}
      <aside className="sidebar">

        {/* Brand Section */}
        <div className="brand">
          <div className="brand-icon"></div>
          <h2 className="brand-text">RentEase</h2>
        </div>

        <div className="sidebar-title">Management</div>

        {/* Sidebar Menu */}
        <ul className="menu">

          <li onClick={() => setActiveMenu("Dashboard")}>
            <HomeIcon className="icon" /> Dashboard
          </li>

          <li onClick={() => setActiveMenu("ViewPayRent")}>
            <CreditCardIcon className="icon" /> View & Pay Rent
          </li>

          <li onClick={() => setActiveMenu("PaymentHistory")}>
            <ClockIcon className="icon" /> Payment History
          </li>

          <li onClick={() => setActiveMenu("RentalAgreement")}>
            <DocumentDuplicateIcon className="icon" /> Rental Agreement
          </li>

          <li onClick={() => setActiveMenu("Utilities")}>
            <WrenchScrewdriverIcon className="icon" /> Utilities
          </li>

          <li onClick={() => setActiveMenu("Maintenance")}>
            <WrenchScrewdriverIcon className="icon" /> Maintenance Requests
          </li>

          <li onClick={() => setActiveMenu("Announcements")}>
            <MegaphoneIcon className="icon" /> Announcements
          </li>

          <li onClick={() => setActiveMenu("PropertySearch")}>
            <BuildingOfficeIcon className="icon" /> Property Search
          </li>

          <li onClick={() => setActiveMenu("Profile")}>
            <UserIcon className="icon" /> Profile
          </li>

        </ul>

        <div className="bottom-section">
          <div className="logout">
            <ArrowLeftOnRectangleIcon className="icon" />
            Logout
          </div>
        </div>

      </aside>

      {/* RIGHT SECTION */}
      <div className="dashboard-right">

        <TenantDashboardTopbar />

        <main className="main-content">

          {/* Dashboard Page */}
          {activeMenu === "Dashboard" && (
            <>
              <h1 className="page-title">Dashboard</h1>

              <div className="stats-row">
                <div className="stat-card"><h3>Next Rent Due</h3><p>$1,200</p></div>
                <div className="stat-card"><h3>Payment Status</h3><p className="status-paid">Paid</p></div>
                <div className="stat-card"><h3>Active Requests</h3><p>2</p></div>
              </div>

              <div className="content-row">
                <div className="big-card">
                  <h2>Rent Summary</h2>
                  <ul>
                    <li><span>Rent Amount:</span><span>$1,200</span></li>
                    <li><span>Due Date:</span><span>15th Jan</span></li>
                    <li><span>Late Fee:</span><span>$0</span></li>
                  </ul>
                </div>

                <div className="big-card">
                  <h2>Announcements</h2>
                  <div className="announcement">⚠ Water supply maintenance on Sunday.</div>
                  <div className="announcement">📌 Rent reminder: Pay before 15th.</div>
                  <div className="announcement">🔒 Security upgrade next week.</div>
                </div>
              </div>
            </>
          )}

          {/* View & Pay Rent */}

         {/* {activeMenu === "ViewPayRent" && (
            <div>
              <h1 className="page-title">View & Pay Rent</h1>
              <p>This is where tenant can pay rent.</p>
            </div>
          )}
            */}
            {activeMenu === "ViewPayRent" && <TenantViewPayRent />}


           




          {/* Payment History */}

          {/*
          {activeMenu === "PaymentHistory" && (
            <h1 className="page-title">Payment History</h1>
          )}
            */}
            {activeMenu === "PaymentHistory" && <TenantPaymentHistory />}




          {/* Rental Agreement */}
          {/*
          {activeMenu === "RentalAgreement" && (
            <h1 className="page-title">Rental Agreement</h1>
          )}
            */}

            {activeMenu === "RentalAgreement" && <TenantRentalAgreement />}



          {/* utilities */}
            {activeMenu === "Utilities" && <TenantUtilities />}



        </main>

      </div>
    </div>
  );
}

export default TenantDashboard;



