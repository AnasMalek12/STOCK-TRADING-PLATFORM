import React from "react";

function Pricing() {
  return (
    <div className="container px-3 px-md-5 py-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 mb-4 mb-md-0">
          <h1 className="mb-3 fs-4 fs-md-2">Unbeatable pricing</h1>

          <p className="text-muted">
            We pioneered the concept of discount broking and price transparency
            in India. Flat fees and no hidden charges.
          </p>

          <a href="#" className="text-decoration-none">
            See pricing <i className="fa fa-long-arrow-right"></i>
          </a>
        </div>

        <div className="col-12 col-md-6">
          <div className="row text-center g-3">
            <div className="col-12 col-sm-4">
              <div className="p-4 border h-100">
                <h2 className="mb-2" style={{ color: "orange" }}>
                  ₹0
                </h2>
                <p className="text-muted mb-0">Free account opening</p>
              </div>
            </div>

            <div className="col-12 col-sm-4">
              <div className="p-4 border h-100">
                <h2 className="mb-2" style={{ color: "orange" }}>
                  ₹0
                </h2>
                <p className="text-muted mb-0">
                  Free equity delivery and direct mutual funds
                </p>
              </div>
            </div>

            <div className="col-12 col-sm-4">
              <div className="p-4 border h-100">
                <h2 className="mb-2" style={{ color: "orange" }}>
                  ₹20
                </h2>
                <p className="text-muted mb-0">Intraday and F&O</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Pricing;
