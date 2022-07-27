const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const app = express();
dotenv.config();

const PORT = process.env.PORT;
const MONGO = process.env.MONGO;

//backend connection
const connect = () => {
  mongoose.connect(MONGO, () => {
    console.log("Connected to DB!");
  }, (err) => {
    console.log(err);
  });
};

app.listen(PORT || 5000, (err) => {
  if (!err) {
    connect();
    console.log("Connected to server!");
  } else {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("Backend Working!");
});
