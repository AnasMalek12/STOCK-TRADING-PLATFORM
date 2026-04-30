import React from "react";

function Awards() {
  return (
    <div className="container mt-5 px-3 px-md-5">
      <div className="row align-items-center">
        <div className="col-12 col-md-6 text-center mb-4 mb-md-0">
          <img className="img-fluid" src="media/images/largestBroker.svg" />
        </div>
        <div className="col-12 col-md-6">
          <h1 className="fs-4 fs-md-2">Largest stock broker in india</h1>
          <p className="mb-4">
            2+ million Charustock clients contribute to over 15% of all retail
            order volumes in india daily by trading and investing in:
          </p>
          <div className="row">
            <div className="col-12 col-sm-6">
              <ul>
                <li>Future and Options</li>
                <li>Commodity derivatives</li>
                <li>Currency derivatives</li>
              </ul>
            </div>
            <div className="col-12 col-sm-6">
              <ul>
                <li>Stocks & IPOs</li>
                <li>direct mutual funds</li>
                <li>Bounds and govt. Securities</li>
              </ul>
            </div>
          </div>
          <div className="row mt-5">
            <div className="col-12 text-center">
              <img
                className="img-fluid"
                src="media\images\pressLogos.png"
                style={{ width: "100%" }}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Awards;
