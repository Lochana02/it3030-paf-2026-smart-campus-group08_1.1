/*import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'

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

export default App ;
*/

import { BrowserRouter, Routes, Route } from "react-router-dom";
import MainLayout from "./layouts/MainLayout";
import Dashboard from "./pages/Dashboard";
import AddResource from "./pages/AddResource";
import Resources from "./pages/Resources";
import UserResources from "./pages/UserResources";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="add" element={<AddResource />} />
          <Route path="resources" element={<Resources />} />
          <Route path="/user/resources" element={<UserResources />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
