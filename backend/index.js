require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const dns = require("dns");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const authRoute = require("./Routes/AuthRoute");
const cors = require("cors");
const { HoldingsModel } = require("./Models/HoldingsModel");
const { PositionsModel } = require("./Models/PositionsModel");
const { OrdersModel } = require("./Models/OrdersModel");
const { requireAuth } = require("./Middlewares/AuthMiddleware");

// ✅ NEW (Socket)
const http = require("http");
const { Server } = require("socket.io");

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 3002;
const uri = process.env.MONGO_URL;

const app = express();

// ✅ CREATE SERVER FOR SOCKET
const server = http.createServer(app);

// ✅ ALLOWED ORIGINS (LOCAL + VERCEL)
const allowedOrigins = [
  "http://localhost:3000",
  "http://localhost:3001",
  process.env.FRONTEND_URL,
  process.env.DASHBOARD_URL,
].filter(Boolean); // Remove undefined values

// ✅ SOCKET.IO SETUP
const io = new Server(server, {
  cors: {
    origin: allowedOrigins,
    methods: ["GET", "POST"],
    credentials: true,
  },
});

app.use(
  cors({
    origin: allowedOrigins,
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  }),
);

app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.json());

app.use("/", authRoute);

// =======================
// 🔥 LIVE STOCK ENGINE
// =======================

let stocks = [
  { name: "INFY", price: 1555.45 },
  { name: "ONGC", price: 116.8 },
  { name: "TCS", price: 3194.8 },
  { name: "KPITTECH", price: 266.45 },
  { name: "QUICKHEAL", price: 308.55 },
  { name: "WIPRO", price: 577.75 },
  { name: "M&M", price: 779.8 },
  { name: "RELIANCE", price: 2112.4 },
  { name: "HUL", price: 512.4 },
];

// ⏱ update every second
setInterval(() => {
  stocks = stocks.map((stock) => {
    const change = (Math.random() - 0.5) * stock.price * 0.002;

    return {
      ...stock,
      price: +(stock.price + change).toFixed(2),
    };
  });

  // 📡 SEND TO FRONTEND
  io.emit("priceUpdate", stocks);
}, 1500);

// =======================
// 🔌 SOCKET CONNECTION
// =======================

io.on("connection", (socket) => {
  console.log("User connected");

  // send initial data
  socket.emit("priceUpdate", stocks);

  socket.on("disconnect", () => {
    console.log("User disconnected");
  });
});

// =======================
// YOUR EXISTING ROUTES
// =======================

app.get("/allHoldings", requireAuth, async (req, res) => {
  let allHoldings = await HoldingsModel.find({ userId: req.user._id });
  res.json(allHoldings);
});

app.get("/allPositions", requireAuth, async (req, res) => {
  let allPositions = await PositionsModel.find({ userId: req.user._id });
  res.json(allPositions);
});

app.get("/allOrders", requireAuth, async (req, res) => {
  let allOrders = await OrdersModel.find({ userId: req.user._id });
  res.json(allOrders);
});

app.get("/userFunds", requireAuth, async (req, res) => {
  res.json({ balance: req.user.balance || 0 });
});

app.post("/addFunds", requireAuth, async (req, res) => {
  const amount = Number(req.body.amount);
  if (!amount || amount <= 0) {
    return res.status(400).send("Invalid amount");
  }

  req.user.balance = (req.user.balance || 0) + amount;
  await req.user.save();

  res.json({ message: "Funds added", balance: req.user.balance });
});

app.post("/withdrawFunds", requireAuth, async (req, res) => {
  const amount = Number(req.body.amount);
  if (!amount || amount <= 0) {
    return res.status(400).send("Invalid amount");
  }

  if ((req.user.balance || 0) < amount) {
    return res.status(400).send("Insufficient funds");
  }

  req.user.balance = req.user.balance - amount;
  await req.user.save();

  res.json({ message: "Funds withdrawn", balance: req.user.balance });
});

app.post("/newOrder", requireAuth, async (req, res) => {
  if (req.body.mode === "BUY") {
    const buyQty = Number(req.body.qty);
    const buyPrice = Number(req.body.price);
    const totalBuyValue = buyQty * buyPrice;

    if ((req.user.balance || 0) < totalBuyValue) {
      return res.status(400).json({ message: "Insufficient funds to buy stocks" });
    }
  }

  let newOrder = new OrdersModel({
    userId: req.user._id,
    name: req.body.name,
    qty: req.body.qty,
    price: req.body.price,
    mode: req.body.mode,
  });

  await newOrder.save();

  if (req.body.mode === "BUY") {
    const buyQty = Number(req.body.qty);
    const buyPrice = Number(req.body.price);
    const totalBuyValue = buyQty * buyPrice;

    // Deduct money from user wallet
    req.user.balance = (req.user.balance || 0) - totalBuyValue;
    await req.user.save();

    let existingHolding = await HoldingsModel.findOne({
      userId: req.user._id,
      name: req.body.name,
    });

    if (existingHolding) {
      const oldQty = existingHolding.qty;
      const oldAvg = existingHolding.avg;
      const totalOldValue = oldQty * oldAvg;
      
      existingHolding.qty = oldQty + buyQty;
      existingHolding.avg = (totalOldValue + totalBuyValue) / existingHolding.qty;
      await existingHolding.save();
    } else {
      let newHolding = new HoldingsModel({
        userId: req.user._id,
        name: req.body.name,
        qty: req.body.qty,
        avg: req.body.price,
        price: req.body.price,
        net: "+0.00%",
        day: "+0.00%",
      });
      await newHolding.save();
    }

    let existingPosition = await PositionsModel.findOne({
      userId: req.user._id,
      name: req.body.name,
    });

    if (existingPosition) {
      const oldQty = existingPosition.qty;
      const oldAvg = existingPosition.avg;
      const totalOldValue = oldQty * oldAvg;
      
      existingPosition.qty = oldQty + buyQty;
      existingPosition.avg = (totalOldValue + totalBuyValue) / existingPosition.qty;
      await existingPosition.save();
    } else {
      let newPosition = new PositionsModel({
        userId: req.user._id,
        product: "CNC",
        name: req.body.name,
        qty: req.body.qty,
        avg: req.body.price,
        price: req.body.price,
        net: "+0.00%",
        day: "+0.00%",
        isLoss: false,
      });
      await newPosition.save();
    }
  } else if (req.body.mode === "SELL") {
    const sellQty = Number(req.body.qty);
    const sellPrice = Number(req.body.price);

    const totalSellValue = sellQty * sellPrice;

    // ✅ ADD MONEY TO USER WALLET
    req.user.balance = (req.user.balance || 0) + totalSellValue;
    await req.user.save();

    let existingHolding = await HoldingsModel.findOne({
      userId: req.user._id,
      name: req.body.name,
    });

    if (existingHolding) {
      if (existingHolding.qty <= sellQty) {
        await HoldingsModel.deleteOne({ _id: existingHolding._id });
      } else {
        existingHolding.qty -= sellQty;
        await existingHolding.save();
      }
    }

    let existingPosition = await PositionsModel.findOne({
      userId: req.user._id,
      name: req.body.name,
    });

    if (existingPosition) {
      if (existingPosition.qty <= sellQty) {
        await PositionsModel.deleteOne({ _id: existingPosition._id });
      } else {
        existingPosition.qty -= sellQty;
        await existingPosition.save();
      }
    }
  }

  res.send("Order saved!");
});

// =======================
// 🚀 START SERVER
// =======================

server.listen(PORT, () => {
  console.log("Server running with WebSocket!");
  mongoose.connect(uri);
  console.log("DB connected!");
});
