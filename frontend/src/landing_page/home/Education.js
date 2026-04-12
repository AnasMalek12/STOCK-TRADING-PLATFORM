import React from "react";

function Education() {
  return (
    <div className="container mt-5 px-3 px-md-5" style={{ maxWidth: "1100px" }}>
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img
            className="img-fluid"
            src="media\images\education.svg"
            alt="Education"
          />
        </div>
        <div className="col-12 col-md-6 text-center text-md-start">
          <h1 className="mb-3 fs-md-2">Free and open market education</h1>
          <p>
            Varsity, the largest online stock market education book in the world
            covering everything from the basics to advanced trading.
          </p>
          <a href="#" className="text-decoration-none d-inline-block mb-4">
            Varsity <i className="fa fa-long-arrow-right"></i>
          </a>
          <p>
            TradingQ&A, the most active trading and investment community in
            India for all your market related queries.
          </p>
          <a href="#" className="text-decoration-none">
            TradingQ&A
            <i className="fa fa-long-arrow-right"></i>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Education;
