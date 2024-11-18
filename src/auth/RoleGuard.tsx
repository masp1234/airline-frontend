import { Navigate } from 'react-router-dom';
import { useRole } from './AuthContext';
import React from 'react';


interface RoleGuardProps {
    allowedRoles: string[];
    children: React.ReactNode;
  }

  interface RoleProtectedRouteProps {
    allowedRoles: string[];
    children: React.ReactNode;
  }

  interface NoRoleProps {
    children: React.ReactNode;
  }
  
  export const RoleGuard: React.FC<RoleGuardProps> = ({ allowedRoles, children }) => {
    const { role } = useRole(); // Fetch the role from the context
  
    if (!role || !allowedRoles.includes(role)) {
      return null; // Role not allowed; Don't render children
    }
  
    return <>{children}</>;
  };

  export const RoleProtectedRoute: React.FC<RoleProtectedRouteProps> = ({ allowedRoles, children }) => {
    const { role } = useRole();
  
    if (!role || !allowedRoles.includes(role)) {
      return <Navigate to="/" />; // Redirect back to home if role is not allowed
    }
  
    return <>{children}</>;
  };

  export const NoRole: React.FC<NoRoleProps> = ({ children }) => {
    const { role } = useRole();
  
    if (role) {
      return null; // User already has a role; Don't render children
    }
  
    return <>{children}</>;
};