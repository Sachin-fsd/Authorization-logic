const mongoose = require("mongoose");

const signupSchema = mongoose.Schema({
    name:{type:String, required:true},
    email:String,
    password:String
})

const signupModel = mongoose.model("signup",signupSchema)

module.exports = {signupModel}