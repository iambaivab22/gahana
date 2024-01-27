const multer = require("multer");

const {
  createTestimonial,
  getAllTestimonial,
  deleteTestimonial,
  updatedTestimonial,
  getTestimonialDetailsById,
} = require("../controllers/testimonialController");
const express = require("express");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const storaget = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/testimonial");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const videoUploadt = multer({ storage: storaget });
const cpUploadProductVideos = videoUploadt.array("testimonialImage", 12);

const router = express.Router();
router.post("/testimonial/new", cpUploadProductVideos, createTestimonial);
router.get("/testimonial", getAllTestimonial);
router.get("/testimonial/:testimonialId", getTestimonialDetailsById);

router.delete("/testimonial/:testimonialId", deleteTestimonial);
``;
router.patch("/testimonial/:testimonialId", updatedTestimonial);
module.exports = router;
