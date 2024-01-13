const mongoose = require("mongoose");

const bannerSchema = new mongoose.Schema({
  bannerImage: {
    type: [String],
  },
});

module.exports = mongoose.model("Banner", bannerSchema);
