import { useContext } from "react";
import { AuthContext } from "./AuthContext";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }

  const { logout, ...rest } = context;

  return {
    ...rest,
    logout: () => {
      logout();
    },
  };
};
