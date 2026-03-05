import React from "react";

function Brokerage() {
  return (
    <div className="container">
      <div className="row p-5 mt-5 text-center border-top">
        <div className="col-8 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5 p-3">Brokerage calculator</h3>
          </a>

          <ul className="text-start text-muted ">
            <li className="mb-2">
              Calculates the total brokerage and charges for each trade before
              placing an order.
            </li>
            <li className="mb-2">
              Helps traders estimate profit or loss after including all fees and
              taxes.
            </li>
            <li className="mb-2">
              Includes charges such as brokerage, GST, STT, exchange transaction
              charges, and SEBI charges.
            </li>
            <li className="mb-2">
              Allows users to enter buy price, sell price, quantity, and trade
              type.
            </li>
            <li className="mb-2">
              Provides a clear breakdown of all trading costs involved in a
              transaction.
            </li>
            <li className="mb-2">
              Helps investors make better trading decisions by understanding
              actual costs.
            </li>
            <li className="mb-2">
              Useful for equity delivery, intraday, and F&O trading
              calculations.
            </li>
          </ul>
        </div>

        <div className="col-4 p-4">
          <a href="" style={{ textDecoration: "none" }}>
            <h3 className="fs-5">List of charges</h3>
          </a>
        </div>
      </div>
    </div>
  );
}

export default Brokerage;
