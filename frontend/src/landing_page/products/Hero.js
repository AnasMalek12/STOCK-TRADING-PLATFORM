import React from "react";

function Hero() {
  return (
    <div className="container border-bottom mb-5">
      <div className="text-center mt-5 py-4 px-3">
        <h1 className="fw-semibold">Technology</h1>

        <h3
          className="text-muted mt-3"
          style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.75rem)" }}
        >
          Sleek, modern, and intuitive trading platforms
        </h3>

        <p
          className="mt-3 mb-5"
          style={{ fontSize: "clamp(0.95rem, 2vw, 1.1rem)" }}
        >
          Check out our{" "}
          <a href="#" style={{ textDecoration: "none" }}>
            investment offerings{" "}
            <i className="fa fa-long-arrow-right ms-1" aria-hidden="true"></i>
          </a>
        </p>
      </div>
    </div>
  );
}

export default Hero;
