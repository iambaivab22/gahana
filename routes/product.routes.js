const express = require("express");

const router = express.Router();
const upload = require("../handlers/multer.handler");
const {
  getAllProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetailsById,
  productListByCategory,
} = require("../controllers/product.controller");
const cpUpload = upload.fields([
  { name: "image", maxCount: 3 },
  { name: "video" },
]);

router.route("/product").get(getAllProduct);
router.route("/product/new").post(cpUpload, createProduct);
router.patch("/product/:productId", cpUpload, updateProduct);
router.delete("/product/:productId", deleteProduct);
router.get("/product/:productId", getProductDetailsById);
router.get("/product/category/:categoryId", productListByCategory);

module.exports = router;
