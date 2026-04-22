import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const MOCK_USER = {
  email: "dave@gmail.com",
  password: "password123",
  data: {
    userId: "USR-001",
    fullName: "Dave Anderson",
    email: "dave@gmail.com",
    role: "admin",
    token: "mock-jwt-token-12345"
  }
};

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("dave@gmail.com");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // කුඩා ප්‍රමදයක් ඇති කිරීම (Loading effect එක පෙන්වීමට)
    setTimeout(() => {
      // Backend එකක් වෙනුවට මෙතනින් check කරනවා
      if (email === MOCK_USER.email && password === MOCK_USER.password) {
        
        const userData = {
          id: MOCK_USER.data.userId,
          userId: MOCK_USER.data.userId,
          fullName: MOCK_USER.data.fullName,
          email: MOCK_USER.data.email,
          role: MOCK_USER.data.role,
        };

        // Local Storage එකේ දත්ත save කිරීම
        localStorage.setItem("authToken", MOCK_USER.data.token);
        localStorage.setItem("user", JSON.stringify(userData));
        localStorage.setItem("notificationUserId", userData.userId);
        
        console.log("Mock Login Successful!");
        
        // Dashboard එකට හෝ Role page එකට යොමු කිරීම
        navigate("/role");
        
      } else {
        setError("Invalid email or password. Try dave@gmail.com / password123");
      }
      setIsLoading(false);
    }, 1000); 
  };

  // Google Login එකත් Mock එකක් විදියට වැඩ කරන හැටි
  const handleGoogleLogin = () => {
    setError("");
    setIsLoading(true);
    
    setTimeout(() => {
      const googleUser = {
        id: "G-999",
        userId: "G-999",
        fullName: "Google User",
        email: "google@demo.com",
        role: "user",
      };
      
      localStorage.setItem("authToken", "google-mock-token");
      localStorage.setItem("user", JSON.stringify(googleUser));
      navigate("/role");
      setIsLoading(false);
    }, 1500);
  };

  const handleForgotPassword = () => alert("Demo: Reset link sent!");
  const handleRequestAccess = () => navigate("/register");

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-[#f8f9fa] font-['Inter'] text-[#191c1d] relative">
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[#004ac6]/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[#6cf8bb]/10 rounded-full blur-[120px]"></div>
      </div>

      <div className="relative z-10 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-14 h-14 bg-[#004ac6] rounded-xl flex items-center justify-center shadow-lg shadow-[#004ac6]/20 mx-auto mb-5">
            <span className="material-symbols-outlined text-white text-3xl">domain</span>
          </div>
          <h1 className="font-['Manrope'] text-4xl font-extrabold tracking-tight text-[#191c1d] mb-2">Campus Hub</h1>
          <p className="text-[#434655] text-xs font-medium tracking-wider uppercase">Smart Campus Operations</p>
        </div>

        <div className="bg-white rounded-2xl p-8 shadow-xl border border-[#e1e3e4]">
          <div className="mb-6">
            <h2 className="font-['Manrope'] text-2xl font-bold text-[#191c1d]">Welcome back</h2>
            <p className="text-[#434655] text-sm mt-1">Access your operational command center</p>
          </div>

          <div className="mb-5 p-3 bg-blue-50 rounded-xl text-xs text-blue-700 text-center border border-blue-100">
            💡 Demo: {MOCK_USER.email} / {MOCK_USER.password}
          </div>

          {error && (
            <div className="mb-5 p-3 bg-[#ffdad6] text-[#93000a] rounded-xl text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-lg">error</span>
              <span>{error}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-5">
            <div>
              <label className="block text-sm font-semibold text-[#434655] mb-2">Campus Email</label>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#737686] text-xl">mail</span>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-12 pr-4 py-3.5 bg-[#f3f4f5] border-none rounded-xl focus:ring-2 focus:ring-[#004ac6]/40 outline-none"
                  required
                />
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="text-sm font-semibold text-[#434655]">Password</label>
                <button type="button" onClick={handleForgotPassword} className="text-xs font-semibold text-[#004ac6]">Forgot password?</button>
              </div>
              <div className="relative">
                <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-[#737686] text-xl">lock</span>
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-12 pr-12 py-3.5 bg-[#f3f4f5] border-none rounded-xl focus:ring-2 focus:ring-[#004ac6]/40 outline-none"
                  required
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-4 top-1/2 -translate-y-1/2 text-[#737686]">
                  <span className="material-symbols-outlined text-xl">{showPassword ? "visibility_off" : "visibility"}</span>
                </button>
              </div>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full py-3.5 bg-gradient-to-r from-[#004ac6] to-[#2563eb] text-white font-bold rounded-xl shadow-md hover:opacity-90 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
            >
              {isLoading ? "Signing In..." : "Sign In to Dashboard"}
              {!isLoading && <span className="material-symbols-outlined text-xl">arrow_forward</span>}
            </button>
          </form>

          <div className="flex items-center gap-4 my-8">
            <div className="flex-1 border-t border-[#e1e3e4]"></div>
            <span className="text-xs font-semibold text-[#737686]">OR</span>
            <div className="flex-1 border-t border-[#e1e3e4]"></div>
          </div>

          <button
            type="button"
            onClick={handleGoogleLogin}
            className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-[#e1e3e4] font-semibold rounded-xl hover:bg-[#f8f9fa] transition-all"
          >
            {/* Google Icon SVG code... */}
            Sign in with Google
          </button>
        </div>

        <div className="text-center mt-8">
          <p className="text-[#434655] text-sm">
            New administrator? <button onClick={handleRequestAccess} className="text-[#004ac6] font-bold hover:underline">Create Account</button>
          </p>
        </div>
      </div>
    </div>
  );
}
