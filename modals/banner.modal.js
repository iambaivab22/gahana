const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  image: {
    type: [String],
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
