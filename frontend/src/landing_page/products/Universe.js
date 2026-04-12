import React from "react";

function Universe() {
  return (
    <div className="container mt-5 text-center">
      <h1 className="mb-3 fw-semibold">The Zerodha Universe</h1>
      <p className="text-muted mx-auto" style={{ maxWidth: "700px" }}>
        Extend your trading and investment experience even further with our
        partner platforms
      </p>

      <div className="row mt-4">
        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img
            src="media/images/smallcaseLogo.png"
            alt="Smallcase"
            className="img-fluid"
            style={{ height: "50px", objectFit: "contain" }}
          />
          <p className="text-muted mt-3">Thematic investing platform</p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img
            src="media/images/streakLogo.png"
            alt="Streak"
            className="img-fluid"
            style={{ height: "50px", objectFit: "contain" }}
          />
          <p className="text-muted mt-3">Algo & strategy platform</p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img
            src="media/images/sensibullLogo.svg"
            alt="Sensibull"
            className="img-fluid"
            style={{ height: "50px", objectFit: "contain" }}
          />
          <p className="text-muted mt-3">Options trading platform</p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img
            src="media/images/zerodhaFundhouse.png"
            alt="Zerodha Fund House"
            className="img-fluid"
            style={{ height: "50px", objectFit: "contain" }}
          />
          <p className="text-muted mt-3">Asset management</p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img
            src="media/images/goldenpiLogo.png"
            alt="GoldenPi"
            className="img-fluid"
            style={{ height: "50px", objectFit: "contain" }}
          />
          <p className="text-muted mt-3">Bonds trading platform</p>
        </div>

        <div className="col-12 col-sm-6 col-md-4 p-3 mt-4">
          <img
            src="media/images/dittoLogo.png"
            alt="Ditto"
            className="img-fluid"
            style={{ height: "50px", objectFit: "contain" }}
          />
          <p className="text-muted mt-3">Insurance</p>
        </div>
      </div>

      <div className="mt-5 mb-5">
        <button className="btn btn-primary fs-5 px-4 py-2">Signup Now</button>
      </div>
    </div>
  );
}

export default Universe;
