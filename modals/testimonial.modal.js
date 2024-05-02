const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema({
  testimonialImage: {
    type: [String],
  },
  testimonialDescription: String,
});

module.exports = mongoose.model("Testimonial", testimonialSchema);
