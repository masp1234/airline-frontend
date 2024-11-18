import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchUserRole } from "./FetchUserRole";

type AuthContextType = {
  role: string | null;
};

const AuthContext = createContext<AuthContextType>({ role: null });

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<string | null>(null);

  useEffect(() => {
    const getRole = async () => {
      const userRole = await fetchUserRole();
      setRole(userRole);
    };

    getRole();
  }, []);

  return <AuthContext.Provider value={{ role }}>{children}</AuthContext.Provider>;
};

// Hook to use AuthContext in components
export const useRole = () => useContext(AuthContext);