// src/utils/Validator.tsx
import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAppSelector } from '../redux/hooks';

interface PrivateRouteProps {
  children: React.ReactNode;
  role?: string | string[]; // Optional — pass this only for role-based protection
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children, role }) => {
  const { isAuthenticated, role: userRole } = useAppSelector((state) => state.auth);
  const location = useLocation();

  if (!isAuthenticated) {
    return <Navigate to="/pages/Login" state={{ from: location }} replace />;
  }

  if (role) {
    const allowedRoles = Array.isArray(role) ? role : [role];
    if (!userRole || !allowedRoles.includes(userRole)) {
      return <Navigate to="/pages/Unauthorized" replace />;
    }
  }

  return <>{children}</>;
};

export default PrivateRoute;
