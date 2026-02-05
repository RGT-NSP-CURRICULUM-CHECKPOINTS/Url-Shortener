import { useEffect, useState } from "react";
import api from "../api/axios";
import "./Analytics.css";

interface UrlAnalytics {
  id: string;
  short_code: string;
  original_url: string;
  clicks: number;
}

const Analytics = () => {
  const [data, setData] = useState<UrlAnalytics[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const res = await api.get("/analytics");
        setData(res.data);
      } catch {
        setError("Failed to load analytics");
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <div>
          <p className="loading-text">Loading your analytics...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="analytics-container">
      <div className="analytics-header">
        <h2 className="analytics-title">URL Analytics</h2>
      </div>
      <p className="analytics-subtitle">
        Track all your shortened URLs and their click counts
      </p>

      {error && <div className="error-alert">{error}</div>}

      {data.length === 0 ? (
        <div className="empty-state">
          <p className="empty-state-title">No URLs Yet</p>
          <p className="empty-state-message">
            Start creating shortened URLs to see your analytics here
          </p>
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="analytics-table">
            <thead>
              <tr className="table-header">
                <th className="table-header-cell">Short Code</th>
                <th className="table-header-cell">Original URL</th>
                <th className="table-header-cell">Clicks</th>
                <th className="table-header-cell">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((url) => (
                <tr key={url.id} className="table-row">
                  <td className="table-cell">
                    <code className="short-code">{url.short_code}</code>
                  </td>
                  <td className="table-cell original-url">
                    <a
                      href={url.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="original-url-link"
                      title={url.original_url}
                    >
                      {url.original_url.length > 50
                        ? url.original_url.substring(0, 50) + "..."
                        : url.original_url}
                    </a>
                  </td>
                  <td className="table-cell">
                    <span className="clicks-badge">{url.clicks}</span>
                  </td>
                  <td className="table-cell">
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `localhost:5000/${url.short_code}`,
                        )
                      }
                      className="copy-button"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="stats-footer">
            <p className="stats-text">
              <span className="stats-highlight">{data.length}</span> URLs
              created •{" "}
              <span className="stats-highlight">
                {data.reduce((sum, url) => sum + url.clicks, 0)}
              </span>{" "}
              total clicks
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
