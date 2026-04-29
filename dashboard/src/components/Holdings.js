import React, { useState, useEffect, useContext } from "react";
import GeneralContext from "./GeneralContext";
import axios from "axios";
import io from "socket.io-client";
import { VerticalGraph } from "./VerticalGraph";

// ✅ connect to backend
const socket = io("http://localhost:3002");

const Holdings = () => {
  const [allHoldings, setAllHoldings] = useState([]);
  const generalContext = useContext(GeneralContext);

  // ✅ fetch initial data
  useEffect(() => {
    axios
      .get("http://localhost:3002/allHoldings", {
        withCredentials: true,
      })
      .then((res) => {
        setAllHoldings(res.data);
      });
  }, []);

  //VerticalGraph.js data
  const labels = allHoldings.map((stock) => stock.name);

  const data = {
    labels,
    datasets: [
      {
        label: "Stock Price",
        data: allHoldings.map((stock) => Number(stock.price)),
        backgroundColor: "rgba(255, 99, 132, 0.5)",
        borderColor: "rgba(255, 99, 132, 1)",
        borderWidth: 1,
      },
    ],
  };

  // 🔥 LIVE PRICE UPDATE
  useEffect(() => {
    socket.on("priceUpdate", (updatedStocks) => {
      if (Math.random() < 0.1) {
        console.log("SOCKET DATA:", updatedStocks);
      }
      setAllHoldings((prev) =>
        prev.map((holding) => {
          const stock = updatedStocks.find((s) => s.name === holding.name);

          if (!stock) return holding;

          const newPrice = stock.price;

          const netPercent = (
            ((newPrice - holding.avg) / holding.avg) *
            100
          ).toFixed(2);

          return {
            ...holding,
            price: newPrice,
            net: `${netPercent}%`,
            isLoss: newPrice < holding.avg,
          };
        }),
      );
    });

    return () => socket.off("priceUpdate");
  }, []);

  // 🔥 TOTAL CALCULATIONS
  const totalInvestment = allHoldings.reduce(
    (acc, stock) => acc + stock.avg * stock.qty,
    0,
  );

  const currentValue = allHoldings.reduce(
    (acc, stock) => acc + stock.price * stock.qty,
    0,
  );

  const totalPnL = currentValue - totalInvestment;

  const pnlPercent = ((totalPnL / totalInvestment) * 100).toFixed(2);

  return (
    <>
      <h3 className="title">Holdings ({allHoldings.length})</h3>

      <div className="order-table">
        <table>
          <thead>
            <tr>
              <th>Instrument</th>
              <th>Qty.</th>
              <th>Avg. cost</th>
              <th>LTP</th>
              <th>Cur. val</th>
              <th>P&L</th>
              <th>Net chg.</th>
              {/* <th>Day chg.</th> */}
              <th>Action</th>
            </tr>
          </thead>

          <tbody>
            {allHoldings.map((stock, index) => {
              const curValue = stock.price * stock.qty;
              const pnl = curValue - stock.avg * stock.qty;

              const isProfit = pnl >= 0;
              const profClass = isProfit ? "profit" : "loss";
              // const dayClass = stock.isLoss ? "loss" : "profit";

              return (
                <tr key={index}>
                  <td>{stock.name}</td>
                  <td>{stock.qty}</td>
                  <td>{stock.avg.toFixed(2)}</td>

                  {/* 🔥 LIVE PRICE COLOR */}
                  <td className={stock.isLoss ? "loss" : "profit"}>
                    {stock.price.toFixed(2)}
                  </td>

                  <td>{curValue.toFixed(2)}</td>

                  <td className={profClass}>{pnl.toFixed(2)}</td>

                  <td className={profClass}>{stock.net}</td>
                  {/* <td className={dayClass}>{stock.day}</td> */}
                  <td>
                    <button
                      className="btn sell"
                      onClick={() => generalContext.openSellWindow(stock.name)}
                      style={{ padding: "4px 12px", fontSize: "0.8rem", margin: 0, cursor: "pointer" }}
                    >
                      Sell
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* 🔥 LIVE TOTALS */}
      <div className="row">
        <div className="col">
          <h5>{totalInvestment.toFixed(2)}</h5>
          <p>Total investment</p>
        </div>

        <div className="col">
          <h5>{currentValue.toFixed(2)}</h5>
          <p>Current value</p>
        </div>

        <div className="col">
          <h5 style={{ color: totalPnL >= 0 ? "green" : "red" }}>
            {totalPnL.toFixed(2)} ({pnlPercent}%)
          </h5>
          <p>P&L</p>
        </div>
      </div>

      <VerticalGraph data={data} />
    </>
  );
};

export default Holdings;
