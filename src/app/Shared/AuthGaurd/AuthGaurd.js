import React from "react";
import { NotificationManager } from "react-notifications";
// import { Navigate } from "react-router-dom";
import { useRouter } from "next/navigation";

export const GuardedRoute = ({ token, children }) => {
  const Router = useRouter();
  if (!token) {
    NotificationManager.info("Please login first");
    // user is not authenticated
    // return <Navigate to="/" />;
    Router.push("/");

    return null;
  }
  return children;
};

export default GuardedRoute;
