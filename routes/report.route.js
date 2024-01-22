const express = require("express");


const reportRouter = express.Router();

reportRouter.get("/",(req,res)=>{
    res.send({"msg":"You can report here"})
})



module.exports = {reportRouter}