const Cart = require("../modals/cart.modal");

exports.createCart = async (req, res) => {
  try {
    console.log("create cart hitted");
    const cart = new Cart(req.body);
    const savedUser = await cart.save();
    res.status(201).json(savedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });
    if (!cart) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(cart);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.updateCartProduct = async (req, res) => {
  try {
    const updatedUser = await Cart.findOneAndUpdate(
      { userId: req.params.userId },
      req.body,
      { new: true }
    );
    if (!updatedUser) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json(updatedUser);
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.deleteCart = async (req, res) => {
  try {
    const { productId } = req.body;
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "User not found" });
    }
    cart.products = cart.products.filter(
      (product) => product.productId !== productId
    );
    await cart.save();
    return res.json(cart.products);
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};
