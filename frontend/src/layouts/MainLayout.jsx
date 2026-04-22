import { Outlet, Link, useLocation } from "react-router-dom";

function MainLayout() {
  const location = useLocation();

  const navItems = [
    { path: "/", name: "Dashboard", icon: "📊" },
    { path: "/resources", name: "Resources", icon: "📦" },
    { path: "/add", name: "Add Resource", icon: "➕" },
    { path: "/user/resources", name: "User Resources", icon: "👤" },
  ];

  const isActive = (path) => location.pathname === path;

  return (
    <div style={{ display: "flex", minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <div
        style={{
          width: "260px",
          background: "#f1f5f9",
          color: "#1e293b",
          minHeight: "100vh",
          position: "sticky",
          top: 0,
          borderRight: "1px solid #e5e7eb",
        }}
      >
        {/* Logo */}
        <div style={{ padding: "24px" }}>
          <h2 style={{ margin: 0, color: "#2563eb" }}>Core Hub</h2>
          <p style={{ fontSize: "12px", color: "#64748b" }}>
            Operational Control
          </p>
        </div>

        {/* Menu */}
        <nav style={{ padding: "10px" }}>
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                padding: "12px",
                marginBottom: "8px",
                borderRadius: "10px",
                textDecoration: "none",
                color: isActive(item.path) ? "#2563eb" : "#64748b",
                background: isActive(item.path) ? "#e0edff" : "transparent",
                fontWeight: isActive(item.path) ? "600" : "400",
                transition: "0.2s",
              }}
            >
              <span>{item.icon}</span>
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>

        {/* Bottom */}
        <div
          style={{
            position: "absolute",
            bottom: 20,
            left: 20,
            fontSize: "12px",
            color: "#64748b",
          }}
        >
          © 2026 Smart Campus
        </div>
      </div>

      {/* Main */}
      <div style={{ flex: 1, background: "#f8fafc" }}>
        
        {/* Header */}
        <div
          style={{
            background: "white",
            padding: "16px 30px",
            borderBottom: "1px solid #e5e7eb",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <h1 style={{ margin: 0 }}>
            {navItems.find((i) => i.path === location.pathname)?.name ||
              "Dashboard"}
          </h1>

          {/* Profile */}
          <div style={{ display: "flex", gap: "15px", alignItems: "center" }}>
            <span>🔔</span>

            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "10px",
                background: "#f1f5f9",
                padding: "6px 12px",
                borderRadius: "20px",
              }}
            >
              <div
                style={{
                  width: "30px",
                  height: "30px",
                  background: "#2563eb",
                  color: "white",
                  borderRadius: "50%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
              >
                AD
              </div>
              <span style={{ fontSize: "14px" }}>Admin</span>
            </div>
          </div>
        </div>

        {/* Content */}
        <div style={{ padding: "30px" }}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default MainLayout;