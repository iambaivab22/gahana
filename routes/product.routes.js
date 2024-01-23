const express = require("express");

const router = express.Router();
// const upload = require("../handlers/multer.handler");

const multer = require("multer");
const {
  getAllProduct,
  createProduct,
  deleteProduct,
  updateProduct,
  getProductDetailsById,
  productListByCategory,
  deleteProductImages,
  CreateProductImage,
  deleteProductColorVariantImages,
  getAllProductVariantImages,
} = require("../controllers/product.controller");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/video");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const videoUpload = multer({ storage: storageVideo });
const cpUploadProductVideo = videoUpload.array("video", 12);
console.log(cpUploadProductVideo, "cpupload");
const upload = multer({ storage: storage });

const cpUploadProduct = upload.array("coloredImage", 12);

router.route("/product").get(getAllProduct);
router.route("/product/new").post(cpUploadProductVideo, createProduct);
router.patch("/product/:productId", cpUploadProductVideo, updateProduct);
router.delete("/product/:productId", deleteProduct);
router.delete("/product/:productId/:imroageId", deleteProductImages);
router.get("/product/:productId", getProductDetailsById);
router.get("/product/category/:categoryId", productListByCategory);

router.route("/productImage/new").post(cpUploadProduct, CreateProductImage);

router.delete(
  "/productColor/:variantId/:imageId",
  deleteProductColorVariantImages
);

router.route("/allColorVariant").get(getAllProductVariantImages);

module.exports = router;
