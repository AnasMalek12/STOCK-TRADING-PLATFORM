import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";
import "./Summary.css";

const socket = io("http://localhost:3002");

const Summary = () => {
  const [holdings, setHoldings] = useState([]);
  const [balance, setBalance] = useState(0);

  // ✅ Fetch holdings
  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings", {
        withCredentials: true,
      })
      .then((res) => {
        setHoldings(res.data);
      })
      .catch((err) => {
        console.log("Holdings fetch error:", err);
      });
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

  // 🔥 Live updates via WebSocket
  useEffect(() => {
    socket.on("priceUpdate", (updatedStocks) => {
      setHoldings((prev) =>
        prev.map((h) => {
          const stock = updatedStocks.find((s) => s.name === h.name);

          if (!stock) return h;

          return {
            ...h,
            price: stock.price,
          };
        }),
      );
    });

    return () => socket.off("priceUpdate");
  }, []);

  // 🔥 Calculations
  const totalInvestment = holdings.reduce((acc, h) => acc + h.avg * h.qty, 0);

  const currentValue = holdings.reduce((acc, h) => acc + h.price * h.qty, 0);

  const totalPnL = currentValue - totalInvestment;

  const availableFunds = balance;

  const availableMargin = currentValue + availableFunds;

  const pnlPercent =
    totalInvestment > 0 ? ((totalPnL / totalInvestment) * 100).toFixed(2) : 0;

  const isProfit = totalPnL >= 0;

  // 💰 Currency formatter
  const formatCurrency = (num) =>
    "₹" +
    num.toLocaleString("en-IN", {
      maximumFractionDigits: 2,
    });

  // 💰 format ₹
  const format = (num) =>
    "₹" + num.toLocaleString("en-IN", { maximumFractionDigits: 2 });

  return (
    <>
      {/* 👤 USER */}
      <div className="username">
        <h6>Hi, {"Trader"} !</h6>
        <hr className="divider" />
      </div>

      {/* 💰 EQUITY */}
      <div className="section">
        <span>
          <p>Equity</p>
        </span>

        <div className="data">
          <div className="first">
            <h3>{formatCurrency(availableMargin)}</h3>
            <p>Margin available</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Margins used <span>{formatCurrency(totalInvestment)}</span>
            </p>
            <p>
              User balance <span>{format(availableFunds)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>

      {/* 📊 HOLDINGS */}
      <div className="section">
        <span>
          <p>Holdings ({holdings.length})</p>
        </span>

        <div className="data">
          <div className="first">
            <h3 className={isProfit ? "profit" : "loss"}>
              {isProfit ? "+" : ""}
              {formatCurrency(totalPnL)}{" "}
              <small>
                {isProfit ? "▲" : "▼"} {pnlPercent}%
              </small>
            </h3>
            <p>P&L</p>
          </div>

          <hr />

          <div className="second">
            <p>
              Current Value <span>{formatCurrency(currentValue)}</span>
            </p>
            <p>
              Investment <span>{formatCurrency(totalInvestment)}</span>
            </p>
          </div>
        </div>

        <hr className="divider" />
      </div>
    </>
  );
};

export default Summary;
