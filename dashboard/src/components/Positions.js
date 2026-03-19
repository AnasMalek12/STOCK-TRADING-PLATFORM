import React, { useState, useEffect } from "react";
import axios from "axios";
import io from "socket.io-client";

// ✅ connect to backend
const socket = io("http://localhost:3002");

const Positions = () => {
  const [allPositions, setAllPositions] = useState([]);

  // ✅ fetch initial data
  useEffect(() => {
    axios
      .get("http://localhost:3002/allPositions", {
        withCredentials: true,
      })
      .then((res) => {
        setAllPositions(res.data);
      });
  }, []);

  // 🔥 LIVE PRICE UPDATE
  useEffect(() => {
    socket.on("priceUpdate", (updatedStocks) => {
      setAllPositions((prev) =>
        prev.map((position) => {
          const stock = updatedStocks.find((s) => s.name === position.name);

          if (!stock) return position;

          const newPrice = stock.price;

          return {
            ...position,
            price: newPrice,
            isLoss: newPrice < position.avg,
          };
        }),
      );
    });

    return () => socket.off("priceUpdate");
  }, []);

  // 🔥 FILTER ONLY LOSS STOCKS
  const filteredPositions = allPositions.filter((stock) => {
    const percentChange = ((stock.price - stock.avg) / stock.avg) * 100;

    return percentChange < 0; // ✅ ONLY NEGATIVE
  });

  return (
    <>
      <h3 className="title">Positions ({filteredPositions.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Product</th>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg.</th>
              <th>LTP</th>
              <th>P&L</th>
              <th>Chg.</th>
            </tr>
          </thead>
          <tbody>
            {filteredPositions.length === 0 ? (
              <tr>
                <td colSpan="7">No losing positions 🎉</td>
              </tr>
            ) : (
              filteredPositions.map((stock, index) => {
                const curValue = stock.price * stock.qty;
                const pnl = curValue - stock.avg * stock.qty;

                const percentChange =
                  ((stock.price - stock.avg) / stock.avg) * 100;

                const isProfit = pnl >= 0;
                const profClass = isProfit ? "profit" : "loss";
                const dayClass = stock.isLoss ? "loss" : "profit";

                return (
                  <tr key={index}>
                    <td>{stock.product}</td>
                    <td>{stock.name}</td>
                    <td>{stock.qty}</td>
                    <td>{stock.avg.toFixed(2)}</td>

                    {/* 🔥 LIVE PRICE */}
                    <td className={stock.isLoss ? "loss" : "profit"}>
                      {stock.price.toFixed(2)}
                    </td>

                    {/* 🔥 LIVE P&L */}
                    <td className={profClass}>{pnl.toFixed(2)}</td>

                    {/* 🔥 % CHANGE */}
                    <td className={dayClass}>{percentChange.toFixed(2)}%</td>
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </>
  );
};

export default Positions;
