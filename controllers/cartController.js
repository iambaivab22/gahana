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
    const cart = await Cart.find({ userId: req.params.userId })
      // .populate({
      //   path: "products.productId",
      // })
      // .populate("products.productId.images");

      .populate({
        path: "products.productId",
        populate: {
          path: "images",
        },
      });

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
    const { productId, userId } = req.body;

    console.log(productId, userId, "productId and user id");

    const cart = await Cart.findOne({ userId: userId });

    if (!cart) {
      return res.status(404).json({ message: "User not found" });
    } else {
      if (cart.products.find((item) => item.productId == productId)) {
        console.log("it does exist");
        item.quantity = req.quantity;
        item.price = req.price;
        const updatedQuantityAndPrice = await cart.save();
        res.status(201).json({
          data: updatedQuantityAndPrice,
          message: "Successfully updated product cart",
        });
      }
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
    return res.json({ data: cart, message: "successfully deleted cart" });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
};

exports.deleteProductFromCart = async (req, res) => {
  try {
    const { productId } = req.params;
    const { userId } = req.body;
    console.log("delete cart");

    const cart = await Cart.findOne({ userId: userId });
    console.log("cart", cart);
    if (!cart) {
      return res.status(404).json({ message: "User not found" });
    } else {
      // console.clear();

      console.log(cart.products, "cart products");
      const productIndex = cart.products.findIndex(
        (product) => product?._id.toString() === productId
      );

      console.log(productIndex, "product Index");

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
