import React from "react";
import { Navigate, redirect, useRouteError } from "react-router-dom";
import PermissionSystem from "../auth";
import { useUser } from "../context/useUser";

const ProtectedRoute = ({ children, resource, action, fallback = "/not-authorized" }) => {
  const { user } = useUser();

  // Check if the user has the required permission
  const hasPermission = PermissionSystem.hasPermission(user?.user, resource, action);

  // If permission is missing, throw a 401 error
  if (!hasPermission) {
    return redirect(fallback)
  }

  // If permission exists, render the children
  return children;
};

export default ProtectedRoute;
