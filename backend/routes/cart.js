const express = require("express");
const router = express.Router();
const Cart = require("../models/Cart");
const auth = require("../middleware/auth");

// ================= GET CART =================
router.get("/", auth, async (req, res) => {
  try {
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) cart = await Cart.create({ userId: req.user.userId, items: [] });
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ================= ADD ITEM =================
router.post("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    let cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) cart = await Cart.create({ userId: req.user.userId, items: [] });

    // Cek apakah product sudah ada di cart
    const existingItem = cart.items.find(item => item.productId === productId);
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.items.push({ productId, quantity });
    }

    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ================= UPDATE ITEM =================
router.put("/", auth, async (req, res) => {
  try {
    const { productId, quantity } = req.body;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    const item = cart.items.find(item => item.productId === productId);
    if (item) {
      item.quantity = quantity;
      await cart.save();
      res.json(cart);
    } else {
      res.status(404).json({ msg: "Item not found in cart" });
    }
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

// ================= DELETE ITEM =================
router.delete("/:productId", auth, async (req, res) => {
  try {
    const { productId } = req.params;
    const cart = await Cart.findOne({ userId: req.user.userId });
    if (!cart) return res.status(404).json({ msg: "Cart not found" });

    cart.items = cart.items.filter(item => item.productId !== productId);
    await cart.save();
    res.json(cart);
  } catch (err) {
    res.status(500).json({ msg: err.message });
  }
});

module.exports = router;
