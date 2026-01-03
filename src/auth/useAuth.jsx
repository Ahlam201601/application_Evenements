import { useEffect, useState } from "react";

export default function useAuth() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const auth = localStorage.getItem("isAuthenticated");
    if (auth === "true") setIsAuthenticated(true);
  }, []);

  const login = (email, password) => {
    if (email === "admin@gmail.com" && password === "12345678") {
      localStorage.setItem("isAuthenticated", "true");
      setIsAuthenticated(true);
      return true;
    }
    return false;
  };

  const logout = () => {
    localStorage.removeItem("isAuthenticated");
    setIsAuthenticated(false);
  };

  return {
    isAuthenticated,
    login,
    logout,
  };
}