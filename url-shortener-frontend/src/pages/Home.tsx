import { useState } from "react";
import api from "../api/axios";
import { useAuth } from "../auth/useAuth";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const { isAuthenticated } = useAuth();
  const [originalUrl, setOriginalUrl] = useState("");
  const [shortUrl, setShortUrl] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="hero-section">
        <h2 className="hero-title">Welcome to URL Shortener</h2>
        <p className="hero-subtitle">
          Transform your long, complicated URLs into short, shareable links in
          seconds.
        </p>

        <div className="hero-buttons">
          <Link to="/sign-up" className="hero-button">
            Create Account
          </Link>
          <Link to="/login" className="hero-button secondary">
            Sign In
          </Link>
        </div>

        <div className="hero-features">
          <div className="feature-card">
            <div className="feature-icon">⚡</div>
            <p className="feature-title">Instant</p>
            <p className="feature-description">Create short URLs instantly</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">📊</div>
            <p className="feature-title">Analytics</p>
            <p className="feature-description">Track your link clicks</p>
          </div>
          <div className="feature-card">
            <div className="feature-icon">🔒</div>
            <p className="feature-title">Secure</p>
            <p className="feature-description">Your data is protected</p>
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
    <div className="form-container">
      <div className="form-card">
        <h2 className="form-title">Shorten Your URL</h2>
        <p className="form-subtitle">
          Paste your long URL below and we'll create a short, shareable link
        </p>

        <form onSubmit={handleShorten}>
          <input
            type="url"
            placeholder="https://example.com/very/long/url/path"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="url-input"
          />

          {error && <div className="error-alert">{error}</div>}

          <button type="submit" disabled={loading} className="submit-button">
            {loading ? "Creating Short Link..." : "Shorten URL"}
          </button>
        </form>
      </div>

      {shortUrl && (
        <div className="success-section">
          <h3 className="success-title">✓ Success!</h3>
          <p className="success-description">
            Your shortened URL is ready to share:
          </p>

          <div className="success-url-container">
            <a
              href={shortUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="success-url-link"
            >
              {shortUrl}
            </a>
            <button onClick={copyToClipboard} className="copy-button">
              Copy Link
            </button>
          </div>

          <p className="success-footer">
            Share this link anywhere! We'll track clicks and show you analytics.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;
