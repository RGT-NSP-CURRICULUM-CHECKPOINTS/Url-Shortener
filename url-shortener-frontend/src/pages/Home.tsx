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
      <div className="max-w-xl mx-auto mt-12 p-10 text-center bg-blue-50 rounded-xl shadow-md">
        <h2 className="text-4xl text-gray-800 mb-4">Welcome to URL Shortener</h2>
        <p className="text-xl text-gray-600 mb-8">
          Transform your long, complicated URLs into short, shareable links in
          seconds.
        </p>

        <div className="flex gap-4 justify-center mb-8">
          <Link
            to="/register"
            className="px-8 py-3 bg-blue-600 text-white no-underline rounded-lg font-semibold hover:bg-blue-700 transition-colors"
          >
            Create Account
          </Link>
          <Link
            to="/login"
            className="px-8 py-3 bg-blue-800 text-white no-underline rounded-lg font-semibold hover:bg-blue-900 transition-colors"
          >
            Sign In
          </Link>
        </div>

        <div className="grid grid-cols-3 gap-6">
          <div className="p-4">
            <div className="text-4xl mb-2">⚡</div>
            <p className="text-gray-800 font-semibold">Instant</p>
            <p className="text-sm text-gray-500">
              Create short URLs instantly
            </p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-2">📊</div>
            <p className="text-gray-800 font-semibold">Analytics</p>
            <p className="text-sm text-gray-500">
              Track your link clicks
            </p>
          </div>
          <div className="p-4">
            <div className="text-4xl mb-2">🔒</div>
            <p className="text-gray-800 font-semibold">Secure</p>
            <p className="text-sm text-gray-500">
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
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-xl shadow-lg p-10 mb-8">
        <h2 className="text-4xl text-gray-800 mb-2 text-center">
          Shorten Your URL
        </h2>
        <p className="text-center text-gray-500 mb-8">
          Paste your long URL below and we'll create a short, shareable link
        </p>

        <form onSubmit={handleShorten}>
          <input
            type="url"
            placeholder="https://example.com/very/long/url/path"
            value={originalUrl}
            onChange={(e) => setOriginalUrl(e.target.value)}
            required
            className="w-full p-4 text-lg border-2 border-gray-200 rounded-lg mb-4 box-border focus:outline-none focus:border-blue-500"
          />

          {error && (
            <div className="p-4 bg-red-100 border-2 border-red-600 text-red-700 rounded-lg mb-4">
              {error}
            </div>
          )}

          <button
            type="submit"
            disabled={loading}
            className="w-full p-4 text-lg font-semibold text-white bg-blue-600 border-0 rounded-lg cursor-pointer hover:bg-blue-700 transition-colors disabled:bg-gray-400"
          >
            {loading ? "Creating Short Link..." : "Shorten URL"}
          </button>
        </form>
      </div>

      {shortUrl && (
        <div className="bg-blue-100 rounded-xl p-8 border-2 border-blue-500">
          <h3 className="text-2xl text-gray-800 mb-4">✓ Success!</h3>
          <p className="text-gray-600 mb-4">
            Your shortened URL is ready to share:
          </p>

          <div className="bg-white rounded-lg p-4 mb-6 border-2 border-blue-500">
            <div className="flex gap-3 items-center flex-wrap">
              <a
                href={shortUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 text-lg break-all flex-1 no-underline hover:underline"
              >
                {shortUrl}
              </a>
              <button
                onClick={copyToClipboard}
                className="px-5 py-2.5 bg-green-600 text-white border-0 rounded-lg cursor-pointer font-semibold hover:bg-green-700 transition-colors"
              >
                Copy Link
              </button>
            </div>
          </div>

          <p className="text-sm text-gray-500">
            Share this link anywhere! We'll track clicks and show you analytics.
          </p>
        </div>
      )}
    </div>
  );
};

export default Home;

