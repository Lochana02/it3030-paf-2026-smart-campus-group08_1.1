import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRoleManagement  from "./pages/AdminRoleManagement";
import AuthCallback from "./pages/AuthCallback";
import Notifications from "./pages/Notifications";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/role" element={<AdminRoleManagement />} />
        <Route path="/notifications" element={<Notifications />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </Router>
  );
}

export default App;