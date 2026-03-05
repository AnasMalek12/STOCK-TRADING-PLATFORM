import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div className="container text-center" style={{ padding: "120px 0" }}>
      <h1 style={{ fontSize: "120px", fontWeight: "600" }}>404</h1>

      <h3 className="mt-3">Page not found</h3>

      <p className="text-muted mt-2">
        The page you are looking for doesn’t exist or has been moved.
      </p>

      <Link to="/" className="btn btn-primary mt-4 px-4 py-2">
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFound;
