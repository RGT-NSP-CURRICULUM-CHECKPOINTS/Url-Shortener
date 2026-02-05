import { Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import PrivateRoute from "./routes/PrivateRoute";
import Analytics from "./pages/Analytics";
import Navigation from "./components/Navigation";
import Header from "./components/Header";

const App = () => {
  return (
    <div className="flex flex-col min-h-screen bg-gray-100  ">
      <Header />

      <Navigation />

      {/* Main Content */}
      <main className="flex-1 max-w-6xl mx-auto px-6 py-12 w-full">
        <Routes>
          {/* Redirect root to login for unauthenticated users */}
          <Route path="/" element={<Navigate to="/login" replace />} />
          
          {/* Development route - remove this when done */}
          <Route path="/home-dev" element={<Home />} />
          
          <Route
            path="/dashboard"
            element={
              <PrivateRoute>
                <Home />
              </PrivateRoute>
            }
          />

          <Route path="/sign-up" element={<Register />} />
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
