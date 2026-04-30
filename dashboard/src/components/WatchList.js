import React, { useContext, useState, useEffect } from "react";
import { Tooltip, Grow } from "@mui/material";
import { watchlist as initialData } from "../data/data";
import GeneralContext from "./GeneralContext";
import io from "socket.io-client";
import "./WatchList.css";

import { KeyboardArrowDown, KeyboardArrowUp } from "@mui/icons-material";
import { DoughnutChart } from "./DoughnutChart";
// ✅ WebSocket connection
const socket = io(process.env.REACT_APP_API_URL || "http://localhost:3002", {
  transports: ["websocket"],
});
socket.on("connect", () => {
  console.log("CONNECTED TO SOCKET ✅");
});

socket.on("connect_error", (err) => {
  console.log("SOCKET ERROR ❌", err);
});

const WatchList = () => {
  const [stocks, setStocks] = useState(initialData);
  const data = {
    labels: stocks.map((stock) => stock.name),
    datasets: [
      {
        label: "Price",
        data: stocks.map((stock) => stock.price),
        backgroundColor: [
          "rgba(255, 99, 132, 0.5)",
          "rgba(54, 162, 235, 0.5)",
          "rgba(255, 206, 86, 0.5)",
          "rgba(75, 192, 192, 0.5)",
          "rgba(153, 102, 255, 0.5)",
          "rgba(255, 159, 64, 0.5)",
        ],
        borderColor: [
          "rgba(255, 99, 132, 1)",
          "rgba(54, 162, 235, 1)",
          "rgba(255, 206, 86, 1)",
          "rgba(75, 192, 192, 1)",
          "rgba(153, 102, 255, 1)",
          "rgba(255, 159, 64, 1)",
        ],
        borderWidth: 1,
      },
    ],
  };

  useEffect(() => {
    socket.on("priceUpdate", (updatedStocks) => {
      setStocks((prevStocks) =>
        prevStocks.map((stock) => {
          const updated = updatedStocks.find((s) => s.name === stock.name);

          if (!updated) return stock;

          const isDown = updated.price < stock.price;

          const percentChange = (
            ((updated.price - stock.price) / stock.price) *
            100
          ).toFixed(2);

          return {
            ...stock,
            price: updated.price,
            percent: `${percentChange}%`,
            isDown: isDown,
          };
        }),
      );
    });

    return () => socket.off("priceUpdate");
  }, []);

  return (
    <div className="watchlist-container">
      <div className="search-container">
        <input
          type="text"
          name="search"
          id="search"
          placeholder="Search eg:infy, bse, nifty fut weekly, gold mcx"
          className="search"
        />
        <span className="counts"> {stocks.length} / 50</span>
      </div>

      <div className="watchlist-scroll">
        <ul className="list">
          {stocks.map((stock, index) => {
            return <WatchListItem stock={stock} key={index} />;
          })}
        </ul>
      </div>

      <div className="chart-container">
        <DoughnutChart data={data} />
      </div>
    </div>
  );
};

export default WatchList;

// ---------------- ITEM ----------------

const WatchListItem = ({ stock }) => {
  const [showWatchlistActions, setShowWatchlistActions] = useState(false);

  return (
    <li
      onMouseEnter={() => setShowWatchlistActions(true)}
      onMouseLeave={() => setShowWatchlistActions(false)}
    >
      <div className="item">
        <p className={stock.isDown ? "down" : "up"}>{stock.name}</p>

        <div className="itemInfo">
          <span className="percent">{stock.percent}</span>

          {stock.isDown ? (
            <KeyboardArrowDown className="down" />
          ) : (
            <KeyboardArrowUp className="up" />
          )}

          {/* ✅ PRICE COLOR LOGIC */}
          <span className={`price ${stock.isDown ? "down" : "up"}`}>
            ₹{stock.price}
          </span>
        </div>
      </div>

      {showWatchlistActions && <WatchListActions uid={stock.name} />}
    </li>
  );
};

// ---------------- ACTIONS ----------------

const WatchListActions = ({ uid }) => {
  const generalContext = useContext(GeneralContext);

  return (
    <span className="actions">
      <span>
        <Tooltip
          title="Buy (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={() => generalContext.openBuyWindow(uid)}
        >
          <button className="buy">Buy</button>
        </Tooltip>

        <Tooltip
          title="Sell (S)"
          placement="top"
          arrow
          TransitionComponent={Grow}
          onClick={() => generalContext.openSellWindow(uid)}
        >
          <button className="sell">Sell</button>
        </Tooltip>
      </span>
    </span>
  );
};
