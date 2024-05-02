const Checkout = require("../modals/checkout.modal");
const 

exports.createCheckout = async (req, res) => {

    const {productId,userId,quantity}=req.body;



  try {
    const existingCart = await Cart.findOne({ userId: req.body.userId });

    if (existingCart) {
      existingCart.products.push(...req.body.products);
      const savedCart = await existingCart.save();
      res
        .status(200)
        .json({ data: savedCart, message: "Updated existing cart" });
    } else {
      const newCheckout = new Checkout(req.body);
      const savedCheckout = await newCheckout.save();
      res
        .status(201)
        .json({ data: savedCart, message: "Successfully created checkout" });
    }
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};