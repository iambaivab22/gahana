const multer = require("multer");
const {
  createBanner,
  getAllBanner,
  updateBanner,
  deleteBannerImage,
} = require("../controllers/bannerController");
const express = require("express");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

const cpUpload = upload.array("bannerImage", 12);

// upload.array("photos", 12);

const router = express.Router();

// const cpUpload = upload.fields([{ name: "image", maxCount: 3 }]);
// const cpUpload = cpUpload.single("bannerImage");

router.post("/banner/new", cpUpload, createBanner);
router.get("/banner", getAllBanner);

router.delete("/banner/:imageName", deleteBannerImage);

module.exports = router;
