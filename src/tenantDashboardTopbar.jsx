{/*}
import "./tenantdashboardtopbar.css";

const TenantDashboardTopbar = () => {
  return (
    <div className="tenant-topbar">
      <div className="tenant-topbar-left">
        <span className="tenant-logo">RentEase</span>
      </div>

      <div className="tenant-topbar-right">
        
      </div>
    </div>
  );
};

export default TenantDashboardTopbar;

*/}


import React from "react";
import "./tenantdashboard.css";

function TenantDashboardTopbar() {
  return (
    <div className="topbar">
      <div className="logo-area">
        <div className="logo-square"></div>
        <span className="logo-text">RentEase</span>
      </div>

      <div className="topbar-right">
        {/* Add account icon, notifications, etc if you want */}
      </div>
    </div>
  );
}

export default TenantDashboardTopbar;

