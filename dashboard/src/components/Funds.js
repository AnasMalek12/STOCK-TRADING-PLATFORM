import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
// import { Link } from "react-router-dom";

const socket = io("http://localhost:3002");

const Funds = () => {
  const [holdings, setHoldings] = useState([]);
  const [balance, setBalance] = useState(0);

  // ✅ fetch holdings
  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings", {
        withCredentials: true,
      })
      .then((res) => setHoldings(res.data));
  }, []);

  // ✅ fetch funds
  useEffect(() => {
    axios
      .get("http://localhost:3002/userFunds", {
        withCredentials: true,
      })
      .then((res) => setBalance(res.data.balance || 0))
      .catch((err) => console.error(err));
  }, []);

  const handleAddFunds = () => {
    const amountStr = window.prompt("Enter amount to add Funds:", "10000");
    const amount = Number(amountStr);
    if (amount > 0) {
      axios
        .post(
          "http://localhost:3002/addFunds",
          { amount },
          { withCredentials: true },
        )
        .then((res) => setBalance(res.data.balance))
        .catch((err) => console.error(err));
    }
  };

  const handleWithdrawFunds = () => {
    const amountStr = window.prompt("Enter amount to withdraw:", "1000");
    const amount = Number(amountStr);
    if (amount > 0) {
      if (amount > balance) {
        alert("Insufficient funds!");
        return;
      }
      axios
        .post(
          "http://localhost:3002/withdrawFunds",
          { amount },
          { withCredentials: true },
        )
        .then((res) => setBalance(res.data.balance))
        .catch((err) => {
          console.error(err);
          alert(err.response?.data || "Error withdrawing funds");
        });
    }
  };

  // 🔥 live update
  useEffect(() => {
    socket.on("priceUpdate", (updatedStocks) => {
      setHoldings((prev) =>
        prev.map((h) => {
          const stock = updatedStocks.find((s) => s.name === h.name);
          if (!stock) return h;

          return { ...h, price: stock.price };
        }),
      );
    });

    return () => socket.off("priceUpdate");
  }, []);

  // 🔥 calculations
  const investment = holdings.reduce((acc, h) => acc + h.avg * h.qty, 0);

  const currentValue = holdings.reduce((acc, h) => acc + h.price * h.qty, 0);

  const availableMargin = currentValue;
  const usedMargin = investment;
  const availableFunds = balance;

  // 💰 format ₹
  const format = (num) =>
    "₹" + num.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return (
    <>
      <div className="funds">
        <p>Instant, zero-cost fund transfers with UPI</p>

        <div className="funds-actions">
          <button className="btn btn-green" onClick={handleAddFunds}>
            Add funds
          </button>
          <button className="btn btn-blue" onClick={handleWithdrawFunds}>
            Withdraw
          </button>
        </div>
      </div>

      <div className="row">
        {/* LEFT SIDE */}
        <div className="col">
          <h3>Equity</h3>

          <div className="table">
            {/* MAIN BALANCE */}
            <div className="row-item highlight">
              <span>Available margin</span>
              <span className="value colored">{format(availableMargin)}</span>
            </div>

            <div className="row-item">
              <span>Used margin</span>
              <span className="value">{format(usedMargin)}</span>
            </div>

            <div className="row-item">
              <span>Available funds</span>
              <span className="value">{format(availableFunds)}</span>
            </div>

            <hr />

            {/* DETAILS */}
            <div className="row-item">
              <span>Opening balance</span>
              <span>{format(investment)}</span>
            </div>

            <div className="row-item">
              <span>Payin</span>
              <span>{format(currentValue)}</span>
            </div>

            <div className="row-item">
              <span>SPAN</span>
              <span>₹0.00</span>
            </div>

            <div className="row-item">
              <span>Delivery margin</span>
              <span>₹0.00</span>
            </div>

            <div className="row-item">
              <span>Exposure</span>
              <span>₹0.00</span>
            </div>

            <div className="row-item">
              <span>Options premium</span>
              <span>₹0.00</span>
            </div>

            <hr />

            {/* COLLATERAL */}
            <div className="row-item">
              <span>Collateral (Liquid funds)</span>
              <span>₹0.00</span>
            </div>

            <div className="row-item">
              <span>Collateral (Equity)</span>
              <span>₹0.00</span>
            </div>

            <div className="row-item total">
              <span>Total collateral</span>
              <span>₹0.00</span>
            </div>
          </div>
        </div>

        {/* RIGHT SIDE */}
        {/* <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <button className="btn btn-blue">Open Account</button>
          </div>
        </div> */}
      </div>
    </>
  );
};

export default Funds;
