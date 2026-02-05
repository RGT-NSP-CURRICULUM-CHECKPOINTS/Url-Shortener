import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api/axios";
import { useAuth } from "../auth/useAuth";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/auth/login", { email, password });
      login(res.data.token);
      navigate("/");
    } catch {
      setError("Login failed. Check your email and password.");
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
        backgroundColor: "#eff6ff",
      }}
    >
      <div
        style={{
          maxWidth: "28rem",
          width: "100%",
          backgroundColor: "#ffffff",
          borderRadius: "0.75rem",
          boxShadow:
            "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)",
          padding: "2.5rem",
        }}
      >
        <div style={{ textAlign: "center", marginBottom: "2rem" }}>
          <h2
            style={{
              fontSize: "1.875rem",
              color: "#1f2937",
              marginBottom: "0.5rem",
            }}
          >
            Welcome
          </h2>
          <p style={{ color: "#6b7280" }}>Sign in to your account</p>
        </div>

        {error && (
          <div
            style={{
              marginBottom: "1rem",
              padding: "1rem",
              backgroundColor: "#fee2e2",
              borderWidth: "2px",
              borderColor: "#dc2626",
              color: "#b91c1c",
              borderRadius: "0.5rem",
            }}
          >
            {error}
          </div>
        )}

        <form onSubmit={handleLogin}>
          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
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
                borderWidth: "2px",
                borderColor: "#e5e7eb",
                borderRadius: "0.5rem",
                fontSize: "1.125rem",
                boxSizing: "border-box",
                outline: "none",
              }}
              onFocus={(e) =>
                ((e.target as HTMLElement).style.borderColor = "#3b82f6")
              }
              onBlur={(e) =>
                ((e.target as HTMLElement).style.borderColor = "#e5e7eb")
              }
            />
          </div>

          <div style={{ marginBottom: "1rem" }}>
            <label
              style={{
                display: "block",
                color: "#374151",
                fontWeight: "600",
                marginBottom: "0.5rem",
              }}
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              style={{
                width: "100%",
                padding: "0.75rem",
                borderWidth: "2px",
                borderColor: "#e5e7eb",
                borderRadius: "0.5rem",
                fontSize: "1.125rem",
                boxSizing: "border-box",
                outline: "none",
              }}
              onFocus={(e) =>
                ((e.target as HTMLElement).style.borderColor = "#3b82f6")
              }
              onBlur={(e) =>
                ((e.target as HTMLElement).style.borderColor = "#e5e7eb")
              }
            />
          </div>

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "0.75rem",
              fontWeight: "600",
              color: "#ffffff",
              backgroundColor: loading ? "#9ca3af" : "#2563eb",
              borderWidth: "0",
              borderRadius: "0.5rem",
              cursor: loading ? "not-allowed" : "pointer",
              marginTop: "1.5rem",
              transition: "background-color 0.15s ease-in-out",
            }}
            onMouseEnter={(e) =>
              !loading && (e.target.style.backgroundColor = "#1d4ed8")
            }
            onMouseLeave={(e) =>
              !loading && (e.target.style.backgroundColor = "#2563eb")
            }
          >
            {loading ? "Signing in..." : "Sign In"}
          </button>
        </form>

        <div
          style={{
            marginTop: "1.5rem",
            paddingTop: "1.5rem",
            borderTopWidth: "2px",
            borderTopColor: "#e5e7eb",
            textAlign: "center",
          }}
        >
          <p style={{ color: "#6b7280" }}>
            Don't have an account?{" "}
            <Link
              to="/sign-up"
              style={{
                color: "#2563eb",
                fontWeight: "600",
                textDecoration: "none",
              }}
              onMouseEnter={(e) =>
                ((e.target as HTMLElement).style.textDecoration = "underline")
              }
              onMouseLeave={(e) =>
                ((e.target as HTMLElement).style.textDecoration = "none")
              }
            >
              Sign up here
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;
