import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (name === "password") {
      calculatePasswordStrength(value);
    }
  };

  const calculatePasswordStrength = (password) => {
    let strength = 0;
    if (password.length >= 8) strength++;
    if (password.match(/[a-z]/) && password.match(/[A-Z]/)) strength++;
    if (password.match(/[0-9]/)) strength++;
    if (password.match(/[^a-zA-Z0-9]/)) strength++;
    setPasswordStrength(strength);
  };

  const getStrengthColor = () => {
    if (passwordStrength === 0) return "bg-gray-200";
    if (passwordStrength === 1) return "bg-red-500";
    if (passwordStrength === 2) return "bg-yellow-500";
    if (passwordStrength === 3) return "bg-green-500";
    return "bg-emerald-500";
  };

  const getStrengthText = () => {
    if (passwordStrength === 0) return "No Password";
    if (passwordStrength === 1) return "Weak";
    if (passwordStrength === 2) return "Medium";
    if (passwordStrength === 3) return "Strong";
    return "Very Strong";
  };

  const validateEmail = (email) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");
    setSuccess(false);

    // Validation
    if (!formData.fullName || !formData.email || !formData.password) {
      setError("Please fill in all fields");
      setIsLoading(false);
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      setIsLoading(false);
      return;
    }

    if (formData.password.length < 6) {
      setError("Password must be at least 6 characters long");
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post("http://localhost:8080/api/auth/register", {
        name: formData.fullName,
        email: formData.email,
        password: formData.password,
      });

      console.log("Registration response:", response.data);
      setSuccess(true);
      
      // Reset form
      setFormData({
        fullName: "",
        email: "",
        password: "",
      });
      
      // Redirect to login after 3 seconds
      setTimeout(() => {
        navigate("/login");
      }, 3000);
      
    } catch (err) {
      console.error("Registration error:", err);
      if (err.response) {
        setError(err.response.data.message || "Registration failed. Please try again.");
      } else if (err.request) {
        setError("Unable to connect to server. Please check your connection.");
      } else {
        setError("An error occurred. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center p-4 bg-gray-50 font-['Inter']">
      {/* Background Decorations */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/5 rounded-full blur-[120px]"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-400/10 rounded-full blur-[120px]"></div>
      </div>

      {/* Success Toast */}
      {success && (
        <div className="fixed bottom-8 right-8 bg-white/90 backdrop-blur-2xl border border-gray-200 p-4 rounded-2xl shadow-xl flex items-center gap-4 max-w-sm z-50">
          <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-600">
            <span className="material-symbols-outlined" style={{ fontVariationSettings: "'FILL' 1" }}>
              check_circle
            </span>
          </div>
          <div>
            <p className="font-bold text-gray-900 text-sm">Registration Successful!</p>
            <p className="text-xs text-gray-500">Account created. Redirecting to login...</p>
          </div>
          <button 
            onClick={() => setSuccess(false)} 
            className="ml-auto text-gray-400 hover:text-gray-600"
          >
            <span className="material-symbols-outlined text-sm">close</span>
          </button>
        </div>
      )}

      {/* Main Container */}
      <div className="relative z-10 w-full max-w-6xl bg-white rounded-3xl shadow-2xl overflow-hidden">
        <div className="flex flex-col lg:flex-row">
          
          {/* Left Side - Visual Section */}
          <div className="lg:w-1/2 bg-blue-600 relative p-12 flex flex-col justify-end min-h-[400px] lg:min-h-0">
            <div className="absolute inset-0">
              <img 
                className="w-full h-full object-cover opacity-40" 
                alt="campus architecture" 
                src="https://images.unsplash.com/photo-1562774053-701939374585?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1466&q=80"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-blue-900 via-blue-800/50 to-transparent"></div>
            </div>
            <div className="relative z-10 text-white">
              <div className="inline-flex items-center gap-2 bg-white/20 backdrop-blur-md px-4 py-2 rounded-full mb-8">
                <span className="material-symbols-outlined">hub</span>
                <span className="font-bold text-sm uppercase tracking-wide">Campus Hub</span>
              </div>
              <h2 className="text-4xl font-bold mb-4 leading-tight">
                The Ethereal Command Center
              </h2>
              <p className="text-white/80 text-lg">
                Empowering administrators and users through architectural intelligence and real-time operational clarity.
              </p>
            </div>
          </div>

          {/* Right Side - Form Section */}
          <div className="lg:w-1/2 p-8 lg:p-12">
            <div className="mb-8">
              <h1 className="text-3xl font-bold text-gray-900 mb-2">
                Create Account
              </h1>
              <p className="text-gray-500">
                Access the Smart Campus unified operations dashboard.
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 text-red-700 rounded-xl text-sm font-medium flex items-start gap-2">
                <span className="material-symbols-outlined text-lg">error</span>
                <span>{error}</span>
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Full Name */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Full Name
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    person
                  </span>
                  <input
                    type="text"
                    name="fullName"
                    value={formData.fullName}
                    onChange={handleInputChange}
                    placeholder="John Doe"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition-all outline-none"
                    disabled={isLoading}
                    required
                  />
                </div>
              </div>

              {/* Email Address */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Email Address
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    mail
                  </span>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="name@campus.edu"
                    className="w-full pl-12 pr-4 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition-all outline-none"
                    disabled={isLoading}
                    required
                  />
                </div>
                <p className="flex items-center gap-1.5 text-xs text-red-500 mt-1">
                  <span className="material-symbols-outlined text-sm">error</span>
                  Please enter a valid campus email address
                </p>
              </div>

              {/* Password */}
              <div>
                <label className="block text-sm font-semibold text-gray-700 mb-2">
                  Password
                </label>
                <div className="relative">
                  <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-gray-400">
                    lock
                  </span>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={formData.password}
                    onChange={handleInputChange}
                    placeholder="**********"
                    className="w-full pl-12 pr-12 py-3 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder:text-gray-400 focus:ring-2 focus:ring-blue-500/40 focus:bg-white transition-all outline-none"
                    disabled={isLoading}
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600"
                  >
                    <span className="material-symbols-outlined">
                      {showPassword ? "visibility_off" : "visibility"}
                    </span>
                  </button>
                </div>

                {/* Password Strength */}
                {formData.password && (
                  <div className="mt-3">
                    <div className="flex items-center gap-2">
                      <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 1 ? getStrengthColor() : "bg-gray-200"}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 2 ? getStrengthColor() : "bg-gray-200"}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 3 ? getStrengthColor() : "bg-gray-200"}`}></div>
                      <div className={`h-1 flex-1 rounded-full ${passwordStrength >= 4 ? getStrengthColor() : "bg-gray-200"}`}></div>
                    </div>
                    <p className="text-xs text-gray-500 mt-1">{getStrengthText()} Strength</p>
                  </div>
                )}
              </div>

              {/* CREATE ACCOUNT BUTTON */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full mt-6 py-4 bg-gradient-to-r from-blue-600 to-blue-700 text-white font-bold rounded-xl shadow-lg shadow-blue-600/30 hover:opacity-90 active:scale-[0.98] transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isLoading ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Creating Account...
                  </>
                ) : (
                  <>
                    Create Account
                    <span className="material-symbols-outlined text-xl">arrow_forward</span>
                  </>
                )}
              </button>

              {/* Sign In Link */}
              <p className="text-center text-gray-500 text-sm mt-6">
                Already part of the ecosystem?{" "}
                <button
                  type="button"
                  onClick={() => navigate("/login")}
                  className="text-blue-600 font-bold hover:underline"
                >
                  Sign In
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}