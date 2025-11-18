const express = require("express");
const router = express.Router();
const Product = require("../models/Product");

const Order = require("../models/Order");
const Cart = require('../models/Cart.js');
const auth = require('../middleware/auth.js');
const midtransClient = require('midtrans-client');


// MIDTRANS CONFIG
let snap = new midtransClient.Snap({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY
});

// CHECKOUT - CREATE ORDER
router.post('/checkout', auth, async (req, res) => {
  try {
    const userId = req.user.id;

    // 1. Ambil semua item cart user
    const cart = await Cart.findOne({ userId });

    if (!cart || cart.items.length === 0) {
      return res.status(400).json({ message: "Cart is empty." });
    }

    // 2. Hitung total price
    let total = 0;
    for (const item of cart.items) {
      const product = await Product.findById(item.productId);
      if (!product) continue;
      total += product.price * item.quantity
    }

    // 3. Buat order record di database
    const newOrder = await Order.create({
      userId,
      items: cart.items,
      totalAmount: total,
      status: "pending",
    });

    // 4. Midtrans transaction payload
    const parameter = {
      transaction_details: {
        order_id: newOrder._id.toString(),
        gross_amount: total
      },
      customer_details: {
        user_id: userId
      }
    };

    // 5. Buat transaksi Midtrans
    const midtransResponse = await snap.createTransaction(parameter);

    // 6. Return payment URL ke frontend
    res.json({
      token: midtransResponse.token,
      redirect_url: midtransResponse.redirect_url
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Checkout failed" });
  }
});

module.exports = router;
