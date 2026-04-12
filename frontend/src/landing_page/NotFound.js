import React from "react";
import { Link } from "react-router-dom";

function NotFound() {
  return (
    <div
      className="container d-flex flex-column justify-content-center align-items-center text-center"
      style={{ minHeight: "80vh" }}
    >
      <h1
        style={{
          fontSize: "clamp(5rem, 12vw, 8rem)",
          fontWeight: "700",
          color: "#0d6efd",
        }}
      >
        404
      </h1>

      <h3 className="mt-3 fw-semibold">Page not found</h3>

      <p className="text-muted mt-2" style={{ maxWidth: "400px" }}>
        The page you are looking for doesn’t exist or may have been moved.
      </p>

      <Link to="/" className="btn btn-primary mt-4 px-4 py-2 shadow-sm">
        Go to Homepage
      </Link>
    </div>
  );
}

export default NotFound;
