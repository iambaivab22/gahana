const Cart = require("../modals/cart.modal");

exports.createCart = async (req, res) => {
  try {
    const existingCart = await Cart.findOne({ userId: req.body.userId });

    if (existingCart) {
      existingCart.products.push(...req.body.products);
      const savedCart = await existingCart.save();

      res
        .status(200)
        .json({ data: savedCart, message: "Updated existing cart" });
    } else {
      const newCart = new Cart(req.body);
      const savedCart = await newCart.save();
      res
        .status(201)
        .json({ data: savedCart, message: "Successfully created cart" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

exports.getUsersCartByUserId = async (req, res) => {
  try {
    const cart = await Cart.find({ userId: req.params.userId });

    // .populate({
    //   path: "products.productId",
    // });

    if (!cart) {
      res.status(404).json({ message: "User not found" });
    } else {
      res.json({ data: cart, success: "successfully found cartitems" });
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
    const { productId } = re;
    q.body;
    const cart = await Cart.findOne({ userId: req.params.userId });
    if (!cart) {
      return res.status(404).json({ message: "User not found" });
    }
    cart.products = cart.products.filter(
      (product) => product.productId !== productId
    );
    await cart.save();
    return res.json({ data: cart, message: "successfully deleted cart" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const { productId, userId } = req.body;
    const cart = await Cart.findOne({ userId: userId });
    if (!cart) {
      return res.status(404).json({ message: "User not found" });
    } else {
      const productIndex = cart.products.findIndex(
        (product) => product.productId.toString() === productId.toString()
      );

      if (productIndex !== -1) {
        // Remove the product from the products array
        cart.products.splice(productIndex, 1);

        // Save the updated cart
        const updatedCart = await cart.save();

        return res.json({
          data: updatedCart,
          message: "Successfully deleted product from cart",
        });
      }
    }
  } catch (err) {
    // await cart.save();
    return res.status(500).json({ error: err.message });
  }
};
