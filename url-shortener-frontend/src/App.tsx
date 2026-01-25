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
    <div className="flex flex-col min-h-screen bg-gray-100">
      {/* Header */}
      <header className="bg-blue-600 text-white p-4 shadow-md">
        <div className="max-w-6xl mx-auto pl-6">
          <h1 className="text-3xl font-bold m-0">URL Shortener</h1>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-white shadow-sm p-4">
        <div className="max-w-6xl mx-auto pl-6 flex gap-6 items-center justify-between">
          <div className="flex gap-6">
            <Link
              to="/dashboard"
              className="text-blue-600 font-semibold no-underline hover:underline"
            >
              Home
            </Link>
            {!isAuthenticated && (
              <>
                <Link
                  to="/register"
                  className="text-blue-600 font-semibold no-underline hover:underline"
                >
                  Register
                </Link>
                <Link
                  to="/login"
                  className="text-blue-600 font-semibold no-underline hover:underline"
                >
                  Login
                </Link>
              </>
            )}
            {isAuthenticated && (
              <Link
                to="/analytics"
                className="text-blue-600 font-semibold no-underline hover:underline"
              >
                Analytics
              </Link>
            )}
          </div>
          {isAuthenticated && (
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-red-600 text-white border-0 rounded-md font-semibold cursor-pointer hover:bg-red-700 transition-colors"
            >
              Logout
            </button>
          )}
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
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

