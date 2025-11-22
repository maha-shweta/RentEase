
/*import Login from "./tenantlogin";  // filename stays lowercase


function App() {
  return (
    <div>
      <Login /> ;
    </div>
    
  );
  
}

export default App;
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import TenantLogin from "./tenantlogin";
import TenantSignup from "./tenantsignup";
import TenantDashboard from "./TenantDashboard";
import TenantViewPayRent from "./TenantViewPayRent";


function App() {
  return (
    
      <Routes>
        <Route path="/" element={<TenantLogin />} />
        <Route path="/login" element={<TenantLogin />} />
        <Route path="/signup" element={<TenantSignup />} />
        <Route path="/dashboard" element={<TenantDashboard />} />
        <Route path="/view-pay-rent" element={<TenantViewPayRent />} />

      </Routes>
    
  );
}

export default App;






