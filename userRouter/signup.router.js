const express = require("express");
const { signupModel } = require("../Model/user.model");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { authenticator } = require("../middleware/authenticator.middleware");
require("dotenv").config();

const userRouter = express.Router();

userRouter.post("/signup", async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const users = await signupModel.find({ email });
    if (users.length !== 0) {
      res.send({ msg: "User already exists" });
    } else {
      bcrypt.hash(password, 2, async (err, hashed) => {
        if (err) {
          res.send({ msg: "Error in hashing password" });
        } else {
          const user = new signupModel({ name, email, password: hashed });
          await user.save();
          res.send({ msg: "User Registered Successfully!" });
        }
      });
    }
  } catch (error) {
    res.send({ msg: "ERROR while registering user", error });
  }
});

userRouter.post("/login", async (req, res) => {
  try {
    const { email, password, name } = req.body;
    const user = await signupModel.findOne({ email });
    if (user==null || Object.keys(user).length === 0) {
      res.send({ msg: "No user found with given email/ Wrong Credential" });
    } else {
      const log_password = user.password;
      bcrypt.compare(password, log_password, (err, result) => {
        if (result == false) {
          res.send({ msg: "Password not match/ Wrong Credentials" });
        } else {
          const token = jwt.sign({ name, email }, process.env.secret_key);
          res.send({ msg: "User logged in successfully!", token: token });
        }
      });
    }
  } catch (error) {
    res.send({ msg: "ERROR while logging in", error });
  }
});

module.exports = { userRouter };
