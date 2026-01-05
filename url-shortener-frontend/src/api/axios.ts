import axios from "axios";

// Create an axios instance with custom configuration
const api = axios.create({
  // Set base URL from environment variable for API endpoint
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    // Set default content type for JSON requests
    "Content-Type": "application/json",
  },
});

// ✅ Attach token automatically
// Interceptor to add authentication token to every request
api.interceptors.request.use((config) => {
  // Retrieve JWT token from localStorage
  const token = localStorage.getItem("token");

  // If token exists, add it to the Authorization header
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  // Return modified config to proceed with the request
  return config;
});

// Export configured axios instance for use throughout the app
export default api;
