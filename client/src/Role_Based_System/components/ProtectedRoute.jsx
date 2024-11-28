import React from "react";
import { Navigate } from "react-router-dom";  // Use Navigate instead of redirect
import PermissionSystem from "../auth";
import { useUser } from "../context/useUser";

const ProtectedRoute = ({ children, resource, action, fallback = "/not-authorized" }) => {
  const { user } = useUser();

  // Check if the user has the required permission
  const hasPermission = PermissionSystem.hasPermission(user?.user, resource, action);

  // If permission is missing, redirect to the fallback page
  if (!hasPermission) {
    console.log("Access denied to view users, redirecting to not-authorized...");
    return <Navigate to={fallback} />;  // Correct way to redirect in React Router v6+
  }

  // If permission exists, render the children
  return children;
};

export default ProtectedRoute;
