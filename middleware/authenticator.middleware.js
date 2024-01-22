const express = require("express");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const authenticator = (req, res, next) => {
  try {
    const token = req.headers.authorization;
    jwt.verify(token, process.env.secret_key, (err, decoded) => {
      if (err) {
        res.send({ msg: "Need to login first" });
      } else {
        req.body.user = decoded;
        next();
      }
    });
  } catch (error) {
    res.send({ msg: "ERROR while middleware" });
  }
};

module.exports = { authenticator };
