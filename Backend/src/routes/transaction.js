const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config({ quiet: true });

const Transaction = require("../models/Transaction.js");


const HARDCODED_USER_ID = "670c29a3d7e7b9e4f5e1a1b2"; // your fixed user

const router = express.Router();

router.get("/getTransaction", async (req,res)=>{
    try {
        const transactions = await Transaction.find({}); 
        console.log("transations====" + transactions);
        res.json(transactions);
        
    } catch (error) {
        console.log('error', error)
    }

})

router.post("/addTransaction", asy)

module.exports = router;