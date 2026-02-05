import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./Navigation.css";

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-links">
          <Link to="/dashboard" className="nav-link">
            Home
          </Link>
          {!isAuthenticated && (
            <>
              <Link to="/sign-up" className="nav-link">
                Register
              </Link>
              <Link to="/login" className="nav-link">
                Login
              </Link>
            </>
          )}
          {isAuthenticated && (
            <Link to="/analytics" className="nav-link">
              Analytics
            </Link>
          )}
        </div>
        {isAuthenticated && (
          <button onClick={handleLogout} className="logout-button">
            Logout
          </button>
        )}
      </div>
    </nav>
  );
};

export default Navigation;
