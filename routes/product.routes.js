const express = require("express");

const router = express.Router();
const upload = require("../handlers/multer.handler");
const {
  getAllProduct,
  createProduct,
} = require("../controllers/product.controller");
const cpUpload = upload.fields([
  { name: "image", maxCount: 3 },
  { name: "video" },
]);

router.route("/product").get(getAllProduct);
router.route("/product/new").post(cpUpload, createProduct);
module.exports = router;
