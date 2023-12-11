const { File } = require("buffer");
const mongoose = require("mongoose");
const { SubCategory } = require("./category.modal");
const { Schema, Document, Types } = require("mongoose");

const productSchema = new mongoose.Schema({
  name: {
    type: String,
  },

  details: {
    type: String,
  },

  price: {
    type: Number,
  },
  image: {
    // data: Buffer,
    // contentType: String,
    type: [
      {
        id: Types.ObjectId,
        url: String,
      },
    ],
  },

  isBestSelling: {
    type: Boolean,
    required: false,
  },

  isNewArrivals: {
    type: Boolean,
    required: false,
  },

  video: {
    type: String,
    required: false,
  },

  originalPrice: {
    type: Number,
  },
  discountedPrice: {
    type: Number,
  },
  discountPercentage: {
    type: Number,
  },
  // description: {
  //   type: String,
  //   required: [true, "Please enter product description"],
  // },
  ratings: {
    type: Number,
    default: 0,
  },
  review: {
    type: String,
  },
  // images: [
  //   {
  //     public_id: {
  //       type: String,
  //       required: true,
  //     },
  //     url: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],
  // category: {
  //   type: String,
  //   required: [true, "please select category for this product"],
  //   enum: {
  //     values: [
  //       "Electronics",
  //       "Cameras",
  //       "Laptop",
  //       "Accessories",
  //       "Headphones",
  //       "Clothes",
  //       "Beauty",
  //       "Health",
  //       "Outdoor",
  //     ],
  //     message: "Please select correct category for product",
  //   },
  // },
  // seller: {
  //   type: String,
  //   required: [true, "please enter product seller"],
  // },
  // stock: {
  //   type: Number,
  //   required: [true, "please enter product stock"],
  //   maxLength: [5, "product name cant exceed 5 character"],
  //   default: 0,
  // },
  // numOfReviews: {
  //   type: Number,
  //   default: 0,
  // },
  // reviews: [
  //   {
  //     name: {
  //       type: String,
  //       required: true,
  //     },
  //     rating: {
  //       type: Number,
  //       required: true,
  //     },
  //     comment: {
  //       type: String,
  //       required: true,
  //     },
  //   },
  // ],

  category: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Category",
  },
  subCategory: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "SubCategory",
  },
});

productSchema.set("toJSON", {
  transform: function (doc, ret) {
    // Map the '_id' field to 'id'
    ret.id = ret._id;
    delete ret._id;
  },
});

module.exports = mongoose.model("Product", productSchema);
