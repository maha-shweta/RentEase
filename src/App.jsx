
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

import { Routes, Route } from "react-router-dom";
import TenantLogin from "./tenantlogin";
import TenantSignup from "./tenantsignup";

function App() {
  return (
    <Routes>
      <Route path="/" element={<TenantLogin />} />      {/* Default route */}
      <Route path="/login" element={<TenantLogin />} />
      <Route path="/signup" element={<TenantSignup />} />
    </Routes>
  );
}

export default App;





