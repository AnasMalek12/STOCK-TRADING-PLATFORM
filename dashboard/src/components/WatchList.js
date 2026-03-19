import React, { useContext, useState, useEffect } from "react";
import { Tooltip, Grow } from "@mui/material";
import { watchlist as initialData } from "../data/data";
import GeneralContext from "./GeneralContext";
import io from "socket.io-client";
import "./WatchList.css";

import {
  BarChartOutlined,
  KeyboardArrowDown,
  KeyboardArrowUp,
  MoreHoriz,
} from "@mui/icons-material";

// ✅ WebSocket connection
const socket = io("http://localhost:3002", {
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

      <ul className="list">
        {stocks.map((stock, index) => {
          return <WatchListItem stock={stock} key={index} />;
        })}
      </ul>
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

        <Tooltip
          title="Analytics (A)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <BarChartOutlined className="icon" />
          </button>
        </Tooltip>

        <Tooltip
          title="More (B)"
          placement="top"
          arrow
          TransitionComponent={Grow}
        >
          <button className="action">
            <MoreHoriz className="icon" />
          </button>
        </Tooltip>
      </span>
    </span>
  );
};
