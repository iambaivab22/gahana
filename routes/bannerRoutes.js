const {
  createBanner,
  getAllBanner,
  updateBanner,
  deleteBanner,
} = require("../controllers/bannerController");
const express = require("express");
const upload = require("../handlers/multer.handler");

const router = express.Router();

const cpUpload = upload.fields([{ name: "image", maxCount: 3 }]);

router.post("/banner/new", cpUpload, createBanner);
router.get("/banner", getAllBanner);
router.patch("/banner/:bannerId", cpUpload, updateBanner);
router.delete("/banner/:bannerId", deleteBanner);

module.exports = router;
