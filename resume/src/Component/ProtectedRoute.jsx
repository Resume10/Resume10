import React from 'react';
import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
  const isLoggedIn = !!localStorage.getItem('userData'); // Your auth check

  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />; // Redirect to signin, replace history
  }

  return children; // Render the protected component (e.g., Dashboard)
};

export default ProtectedRoute;
