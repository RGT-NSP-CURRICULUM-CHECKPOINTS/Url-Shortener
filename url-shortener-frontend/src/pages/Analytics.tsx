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
      <div className="flex justify-center items-center py-16">
        <div className="text-center">
          <p className="text-xl text-gray-500">
            Loading your analytics...
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-xl shadow-lg p-10">
      <h2 className="text-4xl text-gray-800 mb-2">URL Analytics</h2>
      <p className="text-gray-500 mb-8">
        Track all your shortened URLs and their click counts
      </p>

      {error && (
        <div className="mb-4 p-4 bg-red-100 border-2 border-red-600 text-red-700 rounded-lg">
          {error}
        </div>
      )}

      {data.length === 0 ? (
        <div className="text-center py-16 bg-gray-100 rounded-lg">
          <p className="text-2xl text-gray-600 font-semibold mb-2">
            No URLs Yet
          </p>
          <p className="text-gray-400">
            Start creating shortened URLs to see your analytics here
          </p>
        </div>
      ) : (
        <div className="overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="p-4 text-left font-semibold">Short Code</th>
                <th className="p-4 text-left font-semibold">Original URL</th>
                <th className="p-4 text-left font-semibold">Clicks</th>
                <th className="p-4 text-left font-semibold">Action</th>
              </tr>
            </thead>
            <tbody>
              {data.map((url, index) => (
                <tr
                  key={url.id}
                  className="border-b border-gray-200"
                  style={{ backgroundColor: index % 2 === 0 ? "#f9f9f9" : "white" }}
                >
                  <td className="p-4">
                    <code className="bg-gray-200 px-3 py-1 rounded text-blue-600 font-semibold">
                      {url.short_code}
                    </code>
                  </td>
                  <td className="p-4 text-gray-700 break-all max-w-xs">
                    <a
                      href={url.original_url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 no-underline hover:underline"
                      title={url.original_url}
                    >
                      {url.original_url.length > 50
                        ? url.original_url.substring(0, 50) + "..."
                        : url.original_url}
                    </a>
                  </td>
                  <td className="p-4">
                    <span className="inline-block bg-blue-100 text-blue-800 px-4 py-2 rounded-full font-semibold">
                      {url.clicks}
                    </span>
                  </td>
                  <td className="p-4">
                    <button
                      onClick={() =>
                        navigator.clipboard.writeText(
                          `localhost:5000/${url.short_code}`
                        )
                      }
                      className="px-4 py-2 bg-green-600 text-white border-0 rounded-lg cursor-pointer text-sm font-semibold hover:bg-green-700 transition-colors"
                    >
                      Copy
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8 p-4 bg-blue-100 rounded-lg border-2 border-blue-500">
            <p className="text-gray-700">
              <span className="font-semibold text-blue-600">{data.length}</span>{" "}
              URLs created •{" "}
              <span className="font-semibold text-blue-600">
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

