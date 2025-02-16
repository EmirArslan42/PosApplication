const Bill = require("../models/Bill");
const express = require("express");
const router = express.Router();

//* create bill yeni fatura ekle
router.post("/add-bill", async (req, res) => {
  try {
    const newBill = new Bill(req.body);
    await newBill.save();
    res.status(200).json("Fatura oluşturma işlemi başarılı");
  } catch (error) {
    res.status(400).json(error);
  }
});

//? read bill tüm faturaları çek
router.get("/get-all",async (req,res)=>{
    try {
        const bills=await Bill.find();
        res.status(200).json(bills);
    } catch (error) {
        res.status(400).json(error);
    }
});

module.exports=router;