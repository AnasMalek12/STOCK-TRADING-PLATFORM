import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import { Link } from "react-router-dom";

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
          { withCredentials: true }
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
          { withCredentials: true }
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
        <Link className="btn btn-green" onClick={handleAddFunds}>Add funds</Link>
        <Link className="btn btn-blue" onClick={handleWithdrawFunds}>Withdraw</Link>
      </div>

      <div className="row">
        <div className="col">
          <span>
            <p>Equity</p>
          </span>

          <div className="table">
            <div className="data">
              <p>Available margin</p>
              <p className="imp colored">{format(availableMargin)}</p>
            </div>

            <div className="data">
              <p>Used margin</p>
              <p className="imp">{format(usedMargin)}</p>
            </div>

            <div className="data">
              <p>Available funds</p>
              <p className="imp">{format(availableFunds)}</p>
            </div>

            <hr />

            <div className="data">
              <p>Opening Balance</p>
              <p>{format(investment)}</p>
            </div>

            <div className="data">
              <p>Payin</p>
              <p>{format(currentValue)}</p>
            </div>

            <div className="data">
              <p>SPAN</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Delivery margin</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Exposure</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Options premium</p>
              <p>₹0.00</p>
            </div>

            <hr />

            <div className="data">
              <p>Collateral (Liquid funds)</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Collateral (Equity)</p>
              <p>₹0.00</p>
            </div>

            <div className="data">
              <p>Total Collateral</p>
              <p>₹0.00</p>
            </div>
          </div>
        </div>

        <div className="col">
          <div className="commodity">
            <p>You don't have a commodity account</p>
            <Link className="btn btn-blue">Open Account</Link>
          </div>
        </div>
      </div>
    </>
  );
};

export default Funds;
