const mongoose = require("mongoose");

const connection = mongoose.connect("mongodb_url_goes_here");

module.exports = {connection};
