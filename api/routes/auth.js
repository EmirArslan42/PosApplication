const User = require("../models/User");
const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");

//* register (create user) yeni kullanıcı oluştur
router.post("/register", async (req, res) => {
  try {
    const { username, email, password } = req.body;
    const salt = await bcrypt.genSalt(10);
    const hashedpassword = await bcrypt.hash(password, salt);
    const newUser = new User({
      username,
      email,
      password: hashedpassword,
    });
    await newUser.save();
    res.status(200).json("Hesap oluşturma işlemi başarılı");
  } catch (error) {
    res.status(400).json(error);
  }
});

//* login user  kullanıcı giriş
router.post("/login", async (req, res) => {
  try {
    const user = await User.findOne({ email: req.body.email });
    if(!user){
     return res.status(404).send({ error: "User not found!" })
    }
    const validPassword = await bcrypt.compare(
      req.body.password,
      user.password
    );
    if (!validPassword) {
      return res.status(403).json("Invalid password");
    } else {
     return res.status(200).json(user);
    }
  } catch (error) {
   return res.status(400).json(error);
  }
});

module.exports = router;
