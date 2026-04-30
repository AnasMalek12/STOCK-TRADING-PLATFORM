import React from "react";
import { Link } from "react-router-dom";

function OpenAccount() {
  return (
    <div className="container px-3 px-md-5 py-5 mb-5">
      <div className="row text-center justify-content-center">
        <div className="col-12 col-md-8">
          <h1 className="mt-3 fs-4 fs-md-2">Open a Charustock account</h1>

          <p className="text-muted">
            Modern platforms and apps, ₹0 investments, and flat ₹20 intraday and
            F&O trades.
          </p>
          <Link to="/signup">
            <button
              className="btn btn-primary fs-6 fs-md-5 mt-3 px-4 py-2"
              style={{ width: "100%", maxWidth: "300px" }}
            >
              Signup for free
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default OpenAccount;
