import React from "react";

function Hero() {
  return (
    <div className="container-fluid bg-light py-5 border-bottom">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center mb-4">
          <h2>Support Portal</h2>

          <button className="btn btn-primary">My tickets</button>
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
