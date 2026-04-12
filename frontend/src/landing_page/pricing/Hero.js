import React from "react";

function Hero() {
  return (
    <div className="container">
      <div className="row py-5 mt-5 border-bottom text-center">
        <h1 className="fw-semibold">Charges</h1>
        <h3 className="text-muted fs-5 fs-md-4">
          List of all charges and taxes
        </h3>
      </div>

      <div className="row py-5 mt-4 text-center">
        <div className="col-12 col-md-4 p-3 p-md-4 mb-4 mb-md-0">
          <img
            src="media/images/pricingEquity.svg"
            alt="Free equity delivery"
            className="img-fluid mb-4"
            style={{ maxWidth: "220px" }}
          />
          <h2 className="fs-4">Free equity delivery</h2>
          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            All equity delivery investments (NSE, BSE) are absolutely free — ₹0
            brokerage.
          </p>
        </div>

        <div className="col-12 col-md-4 p-3 p-md-4 mb-4 mb-md-0">
          <img
            src="media/images/intradayTrades.svg"
            alt="Intraday and F&O trades"
            className="img-fluid mb-4"
            style={{ maxWidth: "220px" }}
          />
          <h2 className="fs-4">Intraday and F&O trades</h2>
          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            Flat ₹20 or 0.03% (whichever is lower) per executed order on
            intraday trades across equity, currency, and commodity trades. Flat
            ₹20 on all option trades.
          </p>
        </div>

        <div className="col-12 col-md-4 p-3 p-md-4">
          <img
            src="media/images/pricingEquity.svg"
            alt="Free direct mutual funds"
            className="img-fluid mb-4"
            style={{ maxWidth: "220px" }}
          />
          <h2 className="fs-4">Free direct MF</h2>
          <p className="text-muted" style={{ lineHeight: "1.8" }}>
            All direct mutual fund investments are absolutely free — ₹0
            commissions & DP charges.
          </p>
        </div>
      </div>
    </div>
  );
}

export default Hero;
