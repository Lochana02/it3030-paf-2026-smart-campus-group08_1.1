import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import AddResource from "./pages/AddResource";
import Resources from "./pages/Resources";
import UserResources from "./pages/UserResources";
import LandingPage from "./pages/LandingPage";
import Login from "./pages/Login";
import Register from "./pages/Register";
import AdminRoleManagement from "./pages/AdminRoleManagement";
import AuthCallback from "./pages/AuthCallback";
import Notifications from "./pages/Notifications";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add" element={<AddResource />} />
          <Route path="resources" element={<Resources />} />
          <Route path="/user/resources" element={<UserResources />} />
          <Route path="/role" element={<AdminRoleManagement />} />
          <Route path="/notifications" element={<Notifications />} />
        </Route>
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/auth/callback" element={<AuthCallback />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;