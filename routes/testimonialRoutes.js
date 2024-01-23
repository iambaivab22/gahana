const express = require("express");
const {
  createTestimonial,
  getAllTestimonial,
  deleteTestimonial,
  updatedTestimonial,
} = require("../controllers/testimonialController");
const router = express.Router();
router.post("/testimonial/new", createTestimonial);
router.get("/testimonial", getAllTestimonial);

router.delete("/testimonial/:testimonialId", deleteTestimonial);
router.patch("/testimonial/:testimonialId", updatedTestimonial);
module.exports = router;
