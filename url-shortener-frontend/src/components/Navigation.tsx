import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/useAuth";
import "./Navigation.css";

const Navigation = () => {
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const currentPath = location.pathname;
  const shouldShowLink = (path: string) => currentPath !== path;

  const handleLogout = () => {
    const shouldLogout = window.confirm("Are you sure you want to log out?");
    if (!shouldLogout) {
      return;
    }
    logout();
    navigate("/login");
  };

  return (
    <nav className="nav">
      <div className="nav-container">
        <div className="nav-links">
          {shouldShowLink("/dashboard") && (
            <Link to="/dashboard" className="nav-link">
              Home
            </Link>
          )}
          {!isAuthenticated && (
            <>
              {shouldShowLink("/sign-up") && (
                <Link to="/sign-up" className="nav-link">
                  Register
                </Link>
              )}
              {shouldShowLink("/login") && (
                <Link to="/login" className="nav-link">
                  Login
                </Link>
              )}
            </>
          )}
          {isAuthenticated && shouldShowLink("/analytics") && (
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
