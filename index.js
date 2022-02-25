const express = require("express");
var https = require("https");
var http = require("http");
require("dotenv").config();
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = process.env.PORT || 4000;
var dbURI = process.env.MONGODB_URI;

const LogsSchema = require("./models/Log.js");
const { resourceLimits } = require("worker_threads");

app.use(
  cors({
    origin: "*",
    methods: ["PUT", "GET", "POST", "DELETE"],
    credentials: true,
  })
);
app.use(express.json());

// const loginRoute = require("./routes/login");
// const registerRoute = require("./routes/register");
// const postRoute = require("./routes/posts");
// const chatRoute = require("./routes/chat");

// app.use("/login", loginRoute);
// app.use("/register", registerRoute);
// app.use("/posts",postRoute);
// app.use("/chat",chatRoute);

app.get("/", (req, res) => {
  res.send(`ASRJC Class 23/13 2022 server RESTAPI by Ferrois.`);
  console.log(Date.now());
});

app.post("/logs", async (req, res) => {
  const log = new LogsSchema({
    name: req.body.name,
    amount: req.body.amount,
    reason: req.body.reason,
    time: Date.now(),
  });
  try {
    const savedLog = await log.save();
    console.log(`POST LOGS >> ${req.body.name} : $${req.body.amount}`);
    res.json(savedLog);
  } catch (err) {
    res.json({ message: err });
  }
});

app.get("/logs", async (req, res) => {
  console.log("GET LOGS");
  const logs = await LogsSchema.find().limit(20);
  res.json(logs);
});

app.get("/total", async (req, res) => {
  const transactions = await LogsSchema.find();
  const amounts = transactions.map((transaction) => {
    return transaction.amount;
  });
  const sum = amounts.reduce((partialSum, a) => partialSum + a, 0);
  res.json(sum);
});

app.get("/logintokencode", (req,res) => {
    res.json('2313')
})

mongoose.connect(`${dbURI}`, () => console.log("connect to mongodb"));

app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
