
import React from 'react';
import { Navigate } from 'react-router-dom';
import { useApp } from '@/contexts/AppContext';

interface ProtectedRouteProps {
  children: React.ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated, currentCity } = useApp();

  if (!isAuthenticated) {
    return <Navigate to={`/${currentCity}/login`} replace />;
  }

  return <>{children}</>;
}
