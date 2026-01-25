import { Routes, Route, Link, useNavigate, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Analytics from "./pages/Analytics";
import { useAuth } from "./auth/useAuth";

const App = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
        backgroundColor: "#f8f9fa",
      }}
    >
      {/* Header */}
      <header
        style={{
          backgroundColor: "#007bff",
          color: "white",
          padding: "1rem",
          boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "1.5rem",
          }}
        >
          <h1
            style={{
              fontSize: "1.875rem",
              fontWeight: "bold",
              margin: 0,
            }}
          >
            URL Shortener
          </h1>
        </div>
      </header>

      {/* Navigation */}
      <nav
        style={{
          backgroundColor: "white",
          boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
          padding: "1rem",
        }}
      >
        <div
          style={{
            maxWidth: "1200px",
            margin: "0 auto",
            paddingLeft: "1.5rem",
            display: "flex",
            gap: "1.5rem",
            alignItems: "center",
            justifyContent: "space-between",
          }}
        >
          <div style={{ display: "flex", gap: "1.5rem" }}>
            <Link
              to="/dashboard"
              style={{
                color: "#007bff",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Home
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/register"
                  style={{
                    color: "#007bff",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  style={{
                    color: "#007bff",
                    fontWeight: "600",
                    textDecoration: "none",
                  }}
                >
                  Login
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link
                to="/analytics"
                style={{
                  color: "#007bff",
                  fontWeight: "600",
                  textDecoration: "none",
                }}
              >
                Analytics
              </Link>
            )}
          </div>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              style={{
                padding: "0.5rem 1rem",
                backgroundColor: "#dc3545",
                color: "white",
                border: "none",
                borderRadius: "6px",
                fontWeight: "600",
                cursor: "pointer",
              }}
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main
        style={{
          flex: 1,
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "3rem 1.5rem",
          width: "100%",
        }}
      >
        <Routes>
          {/* Redirect root to login for unauthenticated users */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />
          <Route path="/register" element={<Register />} />
          <Route path="/login" element={<Login />} />
          <Route
            path="/analytics"
            element={
              <PrivateRoute>
                <Analytics />
              </PrivateRoute>
            }
          />
        </Routes>
      </main>
    </div>
  );
};

export default App;
