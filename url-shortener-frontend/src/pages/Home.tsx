import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) {
    return (
      <div
        style={{
          maxWidth: "600px",
          margin: "3rem auto",
          padding: "2.5rem",
          textAlign: "center",
          backgroundColor: "#f0f4ff",
          borderRadius: "12px",
          boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            color: "#2c3e50",
            marginBottom: "1rem",
          }}
        >
          Welcome to URL Shortener
        </h2>
        <p
          style={{
            fontSize: "1.125rem",
            color: "#555",
            marginBottom: "2rem",
          }}
        >
          Transform your long, complicated URLs into short, shareable links in
          seconds.
        </p>

        <div
          style={{
            display: "flex",
            gap: "1rem",
            justifyContent: "center",
            marginBottom: "2rem",
          }}
        >
          <Link
            to="/register"
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#007bff",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "600",
            }}
          >
            Create Account
          </Link>
          <Link
            to="/login"
            style={{
              padding: "0.75rem 2rem",
              backgroundColor: "#0056b3",
              color: "white",
              textDecoration: "none",
              borderRadius: "6px",
              fontWeight: "600",
            }}
          >
            Sign In
          </Link>
        </div>

        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: "1.5rem",
          }}
        >
          <div style={{ padding: "1rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>⚡</div>
            <p style={{ color: "#333", fontWeight: "600" }}>Instant</p>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              Create short URLs instantly
            </p>
          </div>
          <div style={{ padding: "1rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>📊</div>
            <p style={{ color: "#333", fontWeight: "600" }}>Analytics</p>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              Track your link clicks
            </p>
          </div>
          <div style={{ padding: "1rem" }}>
            <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>🔒</div>
            <p style={{ color: "#333", fontWeight: "600" }}>Secure</p>
            <p style={{ fontSize: "0.875rem", color: "#666" }}>
              Your data is protected
            </p>
          </div>
        </div>
      </div>
    );
  }

  const handleShorten = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    try {
      const res = await api.post("/shorten", { originalUrl });
      setShortUrl(res.data.shortUrl);
      setOriginalUrl("");
    } catch {
      setError("Failed to create short URL. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  const copyToClipboard = () => {
    navigator.clipboard.writeText(shortUrl);
    alert("Copied to clipboard!");
  };

  return (
    <div style={{ maxWidth: "700px", margin: "0 auto" }}>
      <div
        style={{
          backgroundColor: "white",
          borderRadius: "12px",
          boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
          padding: "2.5rem",
          marginBottom: "2rem",
        }}
      >
        <h2
          style={{
            fontSize: "2rem",
            color: "#2c3e50",
            marginBottom: "0.5rem",
            textAlign: "center",
          }}
        >
          Shorten Your URL
        </h2>
        <p
          style={{
            textAlign: "center",
            color: "#666",
            marginBottom: "2rem",
          }}
        >
          Paste your long URL below and we'll create a short, shareable link
        </p>

        <form onSubmit={handleShorten}>
          <input
            type="url"
            placeholder="https://example.com/very/long/url/path"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1rem",
              border: "2px solid #ddd",
              borderRadius: "8px",
              marginBottom: "1rem",
              boxSizing: "border-box",
            }}
          />

          {error && (
            <div
              style={{
                padding: "1rem",
                backgroundColor: "#ffe5e5",
                border: "2px solid #cc0000",
                color: "#990000",
                borderRadius: "6px",
                marginBottom: "1rem",
              }}
            >
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            style={{
              width: "100%",
              padding: "1rem",
              fontSize: "1rem",
              fontWeight: "600",
              color: "white",
              backgroundColor: loading ? "#999" : "#007bff",
              border: "none",
              borderRadius: "8px",
              cursor: loading ? "not-allowed" : "pointer",
            }}
          >
            {loading ? "Creating Short Link..." : "Shorten URL"}
          </button>
        </form>
      </div>

      {shortUrl && (
        <div
          style={{
            backgroundColor: "#e7f3ff",
            borderRadius: "12px",
            padding: "2rem",
            border: "2px solid #007bff",
          }}
        >
          <h3
            style={{
              fontSize: "1.25rem",
              color: "#2c3e50",
              marginBottom: "1rem",
            }}
          >
            ✓ Success!
          </h3>
          <p style={{ color: "#666", marginBottom: "1rem" }}>
            Your shortened URL is ready to share:
          </p>

          <div
            style={{
              backgroundColor: "white",
              borderRadius: "8px",
              padding: "1rem",
              marginBottom: "1.5rem",
              border: "2px solid #007bff",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  color: "#007bff",
                  fontSize: "1.125rem",
                  wordBreak: "break-all",
                  flex: 1,
                  textDecoration: "none",
                }}
              >
                {shortUrl}
              </a>
              <button
                onClick={copyToClipboard}
                style={{
                  padding: "0.625rem 1.25rem",
                  backgroundColor: "#28a745",
                  color: "white",
                  border: "none",
                  borderRadius: "6px",
                  cursor: "pointer",
                  fontWeight: "600",
                }}
              >
                Copy Link
              </button>
            </div>
          </div>

          <p style={{ fontSize: "0.875rem", color: "#666" }}>
            Share this link anywhere! We'll track clicks and show you analytics.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
