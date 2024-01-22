const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb+srv://sachineducational:sachin@cluster0.mybvg88.mongodb.net/authPractice?retryWrites=true&w=majority");

module.exports = {connection};