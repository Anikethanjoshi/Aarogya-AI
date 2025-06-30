import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import LoadingSpinner from './UI/LoadingSpinner';

interface ProtectedRouteProps {
  children: React.ReactNode;
  requireSubscription?: boolean;
  allowedSubscriptions?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ 
  children, 
  requireSubscription = false,
  allowedSubscriptions = ['basic', 'premium', 'enterprise']
}) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <LoadingSpinner size="lg" />
      </div>
    );
  }

  if (!user) {
    return <Navigate to="/auth" state={{ from: location }} replace />;
  }

  if (requireSubscription && user.subscription && !allowedSubscriptions.includes(user.subscription)) {
    return <Navigate to="/subscription" replace />;
  }

  return <>{children}</>;
};

export default ProtectedRoute;