import React, { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import { Navigate, useLocation } from 'react-router-dom';

// This component will protect your private routes
const PrivateRoute = ({ children }) => {
  const { user, loading } = useContext(AuthContext);
  const location = useLocation();

  // 1. If the user is loading, show a spinner
  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[calc(100vh-340px)]">
        <span className="loading loading-spinner loading-lg"></span>
      </div>
    );
  }

  // 2. If the user is logged in, show the page they want
  if (user) {
    return children;
  }

  // 3. If the user is not logged in, redirect them to the Login page
  // We pass the 'location' so we can redirect them back after login
  return <Navigate to="/login" state={{ from: location }} replace></Navigate>;
};

export default PrivateRoute;