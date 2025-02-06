const jwt=require('jsonwebtoken')
require('dotenv').config()

// const jwt = require("jsonwebtoken");
require("dotenv").config();

const authMiddleware = (req, res, next) => {
  // const token = req.cookies.token; // Read token from cookies
  const token=req.header("Authorization")
  if (!token) return res.status(401).json({ message: "Access Denied" });

  try {
    const verified = jwt.verify(token.replace('Bearer ',''), process.env.JWT_KEY);
    req.user = verified;
    next();
  } catch (error) {
    res.status(400).json({ message: "Invalid Token" });
  }
};

module.exports = authMiddleware;
