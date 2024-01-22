const express = require("express");
const { connection } = require("./configs/db");
const { userRouter } = require("./userRouter/signup.router");
const { signupModel } = require("./Model/user.model");
const { authenticator } = require("./middleware/authenticator.middleware");
const { reportRouter } = require("./routes/report.route");
require("dotenv").config();

const app = express();
app.use(express.json());

app.get("/", async (req, res) => {
  const users = await signupModel.find();
  res.send(users);
});

app.use("/user", userRouter);
app.use(authenticator);
app.use("/report", reportRouter);

app.listen(3500, async () => {
  try {
    await connection;
    console.log("Connected to db");
    console.log("Server running at 3500");
  } catch (error) {
    console.log("ERROR while server start", error);
  }
});
