const Product = require("../models/Product");
const express = require("express");
const router = express.Router();

//* create product yeni ürün ekle
router.post("/add-product", async (req, res) => {
  try {
    const newProduct = new Product(req.body);
    await newProduct.save();
    res.status(200).json("Ürün ekleme işlemi başarılı");
  } catch (error) {
    res.status(400).json(error);
  }
});

//? read product tüm ürünleri çek
router.get("/get-all",async (req,res)=>{
    try {
        const products=await Product.find();
        res.status(200).json(products);
    } catch (error) {
        res.send(400).json(error);
    }
});

//* update product ürünü güncelle
router.put("/update-product",async(req,res)=>{
    try {
        await Product.findOneAndUpdate({_id:req.body.productId},req.body);
        res.status(200).json("Ürün güncelleme işlemi başarılı");
    } catch (error) {
        res.status(400).json(error)
    }
});

//! delete product  ürünü sil
router.delete("/delete-product",async(req,res)=>{
    try {
        await Product.findOneAndDelete({_id:req.body.productId})
        res.status(200).json("Ürün silme işlemi başarılı");
    } catch (error) {
        res.status(400).json(error)
    }
});


module.exports=router;