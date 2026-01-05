import { useEffect, useState } from "react";
import api from "../api/axios";

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
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "16rem",
        }}
      >
        <div style={{ textAlign: "center" }}>
          <p style={{ fontSize: "1.125rem", color: "#666" }}>
            Loading your analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div
      style={{
        backgroundColor: "white",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
        padding: "2.5rem",
      }}
    >
      <h2
        style={{
          fontSize: "2rem",
          color: "#2c3e50",
          marginBottom: "0.5rem",
        }}
      >
        URL Analytics
      </h2>
      <p
        style={{
          color: "#666",
          marginBottom: "2rem",
        }}
      >
        Track all your shortened URLs and their click counts
      </p>

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

      {data.length === 0 ? (
        <div
          style={{
            textAlign: "center",
            padding: "4rem 0",
            backgroundColor: "#f8f9fa",
            borderRadius: "8px",
          }}
        >
          <p
            style={{
              fontSize: "1.5rem",
              color: "#666",
              fontWeight: "600",
              marginBottom: "0.5rem",
            }}
          >
            No URLs Yet
          </p>
          <p style={{ color: "#999" }}>
            Start creating shortened URLs to see your analytics here
          </p>
        </div>
      ) : (
        <div style={{ overflowX: "auto" }}>
          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
            }}
          >
            <thead>
              <tr style={{ backgroundColor: "#007bff", color: "white" }}>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Short Code
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Original URL
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Clicks
                </th>
                <th
                  style={{
                    padding: "1rem",
                    textAlign: "left",
                    fontWeight: "600",
                  }}
                >
                  Action
                </th>
              </tr>
            </thead>
            <tbody>
              {data.map((url, index) => (
                <tr
                  key={url.id}
                  style={{
                    borderBottom: "1px solid #ddd",
                    backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white",
                  }}
                >
                  <td style={{ padding: "1rem" }}>
                    <code
                      style={{
                        backgroundColor: "#e0e0e0",
                        padding: "0.25rem 0.75rem",
                        borderRadius: "4px",
                        color: "#007bff",
                        fontWeight: "600",
                      }}
                    >
                      {url.short_code}
                    </code>
                  </td>
                  <td
                    style={{
                      padding: "1rem",
                      color: "#333",
                      wordBreak: "break-all",
                      maxWidth: "300px",
                    }}
                  >
                    <a
                      href={url.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      style={{ color: "#007bff", textDecoration: "none" }}
                      title={url.original_url}
                    >
                      {url.original_url.length > 50
                        ? url.original_url.substring(0, 50) + "..."
                        : url.original_url}
                    </a>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <span
                      style={{
                        display: "inline-block",
                        backgroundColor: "#e3f2fd",
                        color: "#0056b3",
                        padding: "0.5rem 1rem",
                        borderRadius: "999px",
                        fontWeight: "600",
                      }}
                    >
                      {url.clicks}
                    </span>
                  </td>
                  <td style={{ padding: "1rem" }}>
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `localhost:5000/${url.short_code}`
                        )
                      }
                      style={{
                        padding: "0.5rem 1rem",
                        backgroundColor: "#28a745",
                        color: "white",
                        border: "none",
                        borderRadius: "6px",
                        cursor: "pointer",
                        fontSize: "0.875rem",
                        fontWeight: "600",
                      }}
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div
            style={{
              marginTop: "2rem",
              padding: "1rem",
              backgroundColor: "#e3f2fd",
              borderRadius: "8px",
              border: "2px solid #007bff",
            }}
          >
            <p style={{ color: "#333" }}>
              <span
                style={{ fontWeight: "600", color: "#007bff" }}
              >{`${data.length}`}</span>{" "}
              URLs created •{" "}
              <span
                style={{ fontWeight: "600", color: "#007bff" }}
              >{`${data.reduce((sum, url) => sum + url.clicks, 0)}`}</span>{" "}
              total clicks
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Analytics;
