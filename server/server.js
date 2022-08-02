const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");

const userController = require("./routes/user");
const contactController = require("./routes/contact");

const app = express();
dotenv.config();
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.use("/user", userController);
app.use("/contact", contactController);

const PORT = process.env.PORT;
const MONGO = process.env.MONGO;

//backend connection
const connect = async () => {

  try {
    await mongoose.connect(MONGO || 5000).then(() => console.log("Connected to DB!")).catch((err) => console.log(err));
  } catch (error) {
    console.log(error)
  }
};

app.listen(PORT || 5000, async (err) => {
  if (!err) {
    await connect();
    console.log("Connected to server!");
  } else {
    console.log(err);
  }
});

app.get("/", (req, res) => {
  res.send("Backend Working!");
});
