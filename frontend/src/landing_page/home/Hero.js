import React from "react";
import { Link } from "react-router-dom";

function Hero() {
  return (
    <div className="container px-3 px-md-5 py-4 py-md-5 mb-5">
      <div className="row text-center">
        <div className="col-12">
          <img
            src="media/images/homeHero.png"
            alt="Hero Image"
            className="img-fluid mb-4"
          />
        </div>

        <div className="col-12">
          <h1 className="mt-3 mt-md-5 fs-3 fs-md-1">Invest in everything</h1>
          <p className="text-muted px-2 px-md-0">
            Online platform to invest in stocks, derivatives, mutual funds, and
            more
          </p>
          <Link to="/signup">
            <button
              className="btn btn-primary fs-6 fs-md-5 mb-4 px-4 py-2"
              style={{ maxWidth: "250px", width: "100%" }}
            >
              Signup Now
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Hero;
