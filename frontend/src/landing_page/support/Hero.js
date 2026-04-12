import React from "react";

function Hero() {
  return (
    <div className="container-fluid bg-light py-5 border-bottom">
      <div className="container">
        <div className="d-flex flex-column flex-md-row justify-content-between align-items-start align-items-md-center gap-3 mb-4">
          <h2 className="mb-0 fw-semibold">Support Portal</h2>

          <button className="btn btn-primary px-4 py-2">My tickets</button>
        </div>

        <input
          className="form-control p-3"
          type="text"
          placeholder="Eg: How do I open my account, How do I activate F&O..."
        />
      </div>
    </div>
  );
}

export default Hero;
