import { Navigate } from 'react-router-dom';
import React from 'react';
import { useAppSelector } from '../hooks/useRedux';


interface RoleGuardProps {
    allowedRoles: string[];
    children: React.ReactNode;
  }

  interface NoRoleProps {
    children: React.ReactNode;
  }
  
  export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
    const role = useAppSelector((state) => state.loginUserData.data?.role);

    if (!role || !allowedRoles.includes(role)) {
      return null; // Role not allowed; Don't render children
    }
  
    return <>{children}</>;
  };

  export const RoleProtectedRoute: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
    const role = useAppSelector((state) => state.loginUserData.data?.role);

    if (!role || !allowedRoles.includes(role)) {
      if (role === "Admin") {
        return <Navigate to="/manage-flights" />
      }
      return <Navigate to="/" /> // Redirect back to home if role is not allowed
    }
  
    return <>{children}</>;
  };

  export const NoRole: React.FC<NoRoleProps> = ({ children }) => {
    const role = useAppSelector((state) => state.loginUserData.data?.role);

    if (role) {
      return null; // User already has a role; Don't render children
    }
  
    return <>{children}</>;
  };

  export const NoRoleProtectedRoute: React.FC<NoRoleProps> = ({ children }) => {
    const role = useAppSelector((state) => state.loginUserData.data?.role);
  
    if (role) {
      if (role === "Admin") {
        return <Navigate to="/manage-flights" />
      }
      return <Navigate to="/" />;
    }
  
    return <>{children}</>;
  };