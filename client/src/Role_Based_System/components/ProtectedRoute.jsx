import React from "react";
import { Navigate } from "react-router-dom";
import PermissionSystem from "../auth"
import { useUser } from "../context/useUser";

const ProtectedRoute = ({ children, resource, action,  fallback = "/not-authorized" }) => {
  const {user} = useUser();
  
  
  const hasPermission = PermissionSystem.hasPermission(user.user, resource, action);
 


  

  if (!hasPermission) {
    return <Navigate to={fallback} replace />;
  }

  return children;
};

export default ProtectedRoute;
