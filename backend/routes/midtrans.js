const express = require('express');
const router = express.Router();
const midtransClient = require('midtrans-client');
const Order = require('../models/Order.js');
const Cart = require('../models/Cart.js');

// Midtrans config
let core = new midtransClient.CoreApi({
  isProduction: false,
  serverKey: process.env.MIDTRANS_SERVER_KEY,
  clientKey: process.env.MIDTRANS_CLIENT_KEY
});

// Webhook URL: /api/midtrans/notification
router.post("/notification", async (req, res) => {
  try {
    const notification = await core.transaction.notification(req.body);
    const orderId = notification.order_id;
    const transactionStatus = notification.transaction_status;
    const fraudStatus = notification.fraud_status;

    // Dapatkan order
    const order = await Order.findById(orderId);

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    // STATUS HANDLING
    // ------------------------------------------------
    if (transactionStatus === "capture") {
      if (fraudStatus === "challenge") {
        order.status = "challenge";
      } else if (fraudStatus === "accept") {
        order.status = "paid";
      }
    } else if (transactionStatus === "settlement") {
      order.status = "paid";
    } else if (transactionStatus === "pending") {
      order.status = "pending";
    } else if (transactionStatus === "deny") {
      order.status = "denied";
    } else if (transactionStatus === "expire") {
      order.status = "expired";
    } else if (transactionStatus === "cancel") {
      order.status = "cancelled";
    }

    await order.save();

    // Jika pembayaran sukses, kosongkan cart user
    if (order.status === "paid") {
      await Cart.findOneAndUpdate(
        { userId: order.userId },
        { $set: { items: [] } }
      );
    }

    return res.json({ message: "OK" });
  } catch (err) {
    console.log(err);
    return res.status(500).json({ message: "Webhook failed" });
  }
});

module.exports = router;