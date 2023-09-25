const Product = require("../modals/product.modal");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "domtfu3ua",
  api_key: "551591611862363",
  api_secret: "KNvSA3_VXBB7zwSgMCR8QUM1BOM",
});

// exports.createProduct = async (req, res, next) => {
//   console.clear();
//   console.clear(req.body, "create req");
//   console.log(req.body);
//   try {
//     // const uploader = async (path) => await cloudinary.uploads(path, "Images");
//     const urls = [];
//     let videoUrl;

//     req.files.image.map(async (item, index) => {
//       const { path } = item;
//       const newPath = await cloudinary.uploader.upload(
//         path,
//         // { public_id: "" },
//         { resource_type: "auto" },
//         function (error, result) {
//           if (result) {
//             console.log(result, "results");
//             urls.push({ url: result.secure_url });
//           }
//         }
//       );
//     });

//     const oldPath = await cloudinary.uploader.upload(
//       req.files.video[0].path,
//       // { public_id: "" },
//       { resource_type: "auto" },
//       function (error, result) {
//         if (result) {
//           videoUrl = result.secure_url;
//         }
//       }
//     );

//     const newProduct = new Product({
//       name: req.body.name,
//       price: req.body.price,
//       image: urls,
//       video: videoUrl,
//       originalPrice: req.body.originalPrice,
//       discountedPrice: req.body.discountedPrice,
//       category: req.body.category,
//       subCategory: req.body.subCategory,
//       discountPercentage: req.body.discountPercentage,
//     });

//     // res.json({ success: "success" });

//     newProduct.save().then((prod) => {
//       console.clear(prod, "production");
//       res.json(prod);
//     });
//   } catch (error) {
//     return next(error);
//   }
// };

exports.createProduct = async (req, res, next) => {
  console.clear();
  console.clear(req.body, "create req");
  console.log(req.body);

  try {
    const urls = [];
    let videoUrl;

    // Use Promise.all to await all the uploads
    await Promise.all(
      req.files.image.map(async (item, index) => {
        const { path } = item;
        const newPath = await cloudinary.uploader.upload(
          path,
          { resource_type: "auto" } // Assuming you want to auto-detect resource type
        );

        console.log(newPath, "results");
        urls.push({ url: newPath.secure_url });
      })
    );

    const videoPath = req.files.video[0].path;
    const videoResult = await cloudinary.uploader.upload(
      videoPath,
      { resource_type: "auto" } // Assuming you want to auto-detect resource type
    );

    videoUrl = videoResult.secure_url;

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      image: urls,
      video: videoUrl,
      originalPrice: req.body.originalPrice,
      discountedPrice: req.body.discountedPrice,
      category: req.body.category,
      subCategory: req.body.subCategory,
      discountPercentage: req.body.discountPercentage,
    });

    // Save the product and respond with the saved product
    const prod = await newProduct.save();
    console.clear(prod, "production");
    res.json(prod);
  } catch (error) {
    return next(error);
  }
};

exports.getAllProduct = async (req, res, next) => {
  const { search, sort, minPrice, maxPrice } = req.query;
  try {
    let query = {};
    // Search products by name if a search query is provided
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }
    if (minPrice && maxPrice) {
      query.price = { $gte: parseInt(minPrice), $lte: parseInt(maxPrice) };
    } else if (minPrice) {
      query.price = { $gte: parseInt(minPrice) };
    } else if (maxPrice) {
      query.price = { $lte: parseInt(maxPrice) };
    }

    // Sort products by price if a sort query is provided
    let sortOption = {};
    if (sort === "asc") {
      sortOption.price = 1;
    } else if (sort === "desc") {
      sortOption.price = -1;
    }

    const products = await Product.find(query)
      .populate("category")
      .populate("subCategory")
      .sort(sortOption);

    res
      .status(201)
      .json({ message: "success fully get products", data: products });
    // console.clear("all items find");
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// exports.getAllProduct = async (req, res, next) => {
//   const data = await Product.find()
//     .populate("category")
//     .populate("subCategory");
//   res.status(201).json({ message: "success fully get products", data: data });
//   console.clear("all items find");
// };

exports.deleteProduct = async (req, res, next) => {
  console.clear(req.params.productId, "req params id");
  try {
    const deleteProductData = await Product.findByIdAndRemove(
      req.params.productId
    );

    // console.clear(deleteProductData, "deleteproduct data");

    res.status(201).json({
      message: "success fully deleted Product",
      data: deleteProductData,
    });
  } catch (error) {
    console.clear("error", error);
  }
};

exports.deleteProductImages = async (req, res, next) => {
  console.log(req.params, "req.params");
  // const { productId, imroageId } = req.params;
  const { productId, imroageId } = req.params;
  console.log(productId, imroageId, "id hai ta ");

  try {
    // Find the product by ID

    const product = await Product.findOne({ _id: productId });
    console.log(product, "rpoductsssss");

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Find the image within the product's images array by its ID
    const imageIndex = product.image.findIndex((img) => img._id == imroageId);
    console.log(imageIndex, "imageindex");

    if (imageIndex === -1) {
      return res.status(404).json({ error: "Image not found in the product" });
    }

    // Remove the image from the product's images array
    const deletedImage = product.image.splice(imageIndex, 1)[0];
    console.log(deletedImage, "DeletedImage");

    // Save the modified product to update the images array in the database
    await product.save();

    // Delete the image from Cloudinary using its public ID
    await cloudinary.uploader.destroy(deletedImage._id);

    res.json({ message: "Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.updateProduct = async (req, res, next) => {
  // console.clear(req.params.productId, "product id");
  // console.clear(req.body, "req body");
  try {
    const urls = [];
    let videoUrl;

    await Promise.all(
      req.files.image.map(async (item, index) => {
        const { path } = item;
        const newPath = await cloudinary.uploader.upload(
          path,
          { resource_type: "auto" } // Assuming you want to auto-detect resource type
        );

        urls.push({ url: newPath.secure_url });
      })
    );

    if (req.files.video) {
      const oldPath = await cloudinary.uploader.upload(
        req.files.video[0].path,
        // { public_id: "" },
        { resource_type: "auto" },
        function (error, result) {
          if (result) {
            videoUrl = result.secure_url;
          }
        }
      );
    }

    const product = await Product.findOne({ _id: req.params.productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Append the new images to the existing ones
    let newImages = product.image;
    console.clear(urls, "urls");
    console.clear(newImages, "newImages");

    let updatedData = [...newImages, ...urls];
    console.clear(updatedData, "updatedData");

    // Save the updated product to the database
    // await product.save();

    const updatedProductData = await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      {
        name: req.body.name,
        price: req.body.price,
        image: [...newImages, ...urls],
        video: videoUrl,
        originalPrice: req.body.originalPrice,
        discountedPrice: req.body.discountedPrice,
        category: req.body.category,
        subCategory: req.body.subCategory,
        discountPercentage: req.body.discountPercentage,
      },
      {
        new: true,
      }
    );
    console.clear(updatedProductData, "udpated Product data");
    res.status(201).json({
      message: "success fully udpated Product",
      data: updatedProductData,
    });
  } catch (error) {
    console.clear("error", error);
  }
};

exports.getProductDetailsById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const productDetails = await Product.findById(productId)
      .populate("category")
      .populate("subCategory");

    console.clear(productDetails, "productdetails");

    if (!productDetails) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(201).json({
      message: "successfully get Product Details",
      data: productDetails,
    });
  } catch (error) {
    console.clear(error, "error");
  }
};

exports.productListByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const productListByCategory = await Product.find({
      category: categoryId,
    });

    console.clear(productListByCategory, "rpoduct list by category");

    if (!productListByCategory) {
      return res
        .status(404)
        .json({ error: "Product not found for this category" });
    }

    res.status(201).json({
      message: "successfully get Products",
      data: productListByCategory,
    });
  } catch (error) {
    console.clear(error, "error");
  }
};