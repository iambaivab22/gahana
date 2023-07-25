const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true,
  },
  subCategories: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SubCategory",
    },
  ],
});

const subCategorySchema = new mongoose.Schema({
  name: {
    type: String,
    unique: true,
    index: true,
  },
});
exports.Category = mongoose.model("Category", categorySchema);
exports.SubCategory = mongoose.model("SubCategory", subCategorySchema);
