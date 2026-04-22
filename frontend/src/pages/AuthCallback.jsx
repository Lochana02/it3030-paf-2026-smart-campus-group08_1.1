// frontend/src/pages/AuthCallback.jsx
import { useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";

export default function AuthCallback() {
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const token = params.get("token");
    const error = params.get("error");
    
    if (error) {
      console.error("Auth error:", error);
      navigate("/login");
      return;
    }
    
    if (token) {
      localStorage.setItem("authToken", token);
      
      // Decode token to get user info (optional)
      try {
        const base64Url = token.split('.')[1];
        const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
        const user = JSON.parse(atob(base64));
        localStorage.setItem("user", JSON.stringify(user));
        localStorage.setItem("notificationUserId", user.email || user.sub || user.id || "");
      } catch (e) {
        console.error("Error decoding token", e);
      }
      
      // Redirect to dashboard
      window.location.href = "/role";
    } else {
      navigate("/login");
    }
  }, [location, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#f8f9fa]">
      <div className="text-center">
        <div className="w-16 h-16 border-4 border-[#004ac6] border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
        <h2 className="text-xl font-semibold text-[#191c1d] mb-2">Authenticating...</h2>
        <p className="text-[#434655] text-sm">Please wait while we sign you in</p>
      </div>
    </div>
  );
}