import React from "react";
import { Navigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";

const PrivateRoute = ({ children, role }) => {
  const token = localStorage.getItem("token");

  if (!token) {
    // Redirect to home if no token is present
    return <Navigate to="/" />;
  }

  try {
    const decodedToken = jwtDecode(token);
    if (decodedToken.role !== role) {
      // Redirect to home if the role does not match
      return <Navigate to="/" />;
    }

    // Token and role are valid
    return children;
  } catch (error) {
    // If token is invalid, redirect to home
    console.error("Invalid token:", error);
    return <Navigate to="/" />;
  }
};

export default PrivateRoute;
