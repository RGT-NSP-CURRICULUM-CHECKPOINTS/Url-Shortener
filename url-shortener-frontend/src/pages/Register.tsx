import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";

const Register = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      await api.post("/auth/register", { email, password });
      alert("Registration successful! Please login.");
      navigate("/login");
    } catch {
      setError("Registration failed. Email may already be in use.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      style={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f0f4ff",
      }}
    >
      <div
        style={{
          maxWidth: "400px",
          width: "100%",
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 8px 16px rgba(0,0,0,0.15)",
          padding: "2.5rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              color: "#2c3e50",
              marginBottom: "0.5rem",
            }}
          >
            Create Account
          </h2>
          <p style={{ color: "#666" }}>Join us and start shortening URLs</p>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              backgroundColor: "#ffe5e5",
              border: "2px solid #cc0000",
              color: "#990000",
              borderRadius: "6px",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleRegister}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#333",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Email Address
            </label>
            <input
              type="email"
              placeholder="you@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#333",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter a strong password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                border: "2px solid #ddd",
                borderRadius: "8px",
                fontSize: "1rem",
                boxSizing: "border-box",
              }}
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontWeight: "600",
              color: "white",
              backgroundColor: loading ? "#999" : "#007bff",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "1.5rem",
            }}
          >
            {loading ? "Creating Account..." : "Register"}
          </button>
        </form>

        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.5rem",
            borderTop: "2px solid #ddd",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#666" }}>
            Already have an account?{" "}
            <Link
              to="/login"
              style={{
                color: "#007bff",
                fontWeight: "600",
                textDecoration: "none",
              }}
            >
              Sign in here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;
