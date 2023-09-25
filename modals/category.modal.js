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

categorySchema.set("toJSON", {
  transform: function (doc, ret) {
    // Map the '_id' field to 'id'
    ret.id = ret._id;
    delete ret._id;
  },
});

subCategorySchema.set("toJSON", {
  transform: function (doc, ret) {
    // Map the '_id' field to 'id'
    ret.id = ret._id;
    delete ret._id;
  },
});

exports.Category = mongoose.model("Category", categorySchema);
exports.SubCategory = mongoose.model("SubCategory", subCategorySchema);
