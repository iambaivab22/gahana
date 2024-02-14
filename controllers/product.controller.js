const { Product, ProductImage } = require("../modals/product.modal");

exports.createProduct = async (req, res, next) => {
  try {
    const urls = [];
    let videoUrl;

    const imagesfile = req.files.map((file) => file.filename);
    console.log(req.files, "coloredImage");
    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      stockQuantity: req.body.stockQuantity,
      images: req.body.productVariants,
      video: req.files[0].filename,
      originalPrice: req.body.originalPrice,
      discountedPrice: req.body.discountedPrice,
      category: req.body.category,
      subCategory: req.body.subCategory,
      discountPercentage: req.body.discountPercentage,
      description: req.body.description,
      rating: req.body.rating,
      review: req.body.review,
      isNewArrivals: req.body.isNewArrivals,
      isBestSelling: req.body.isBestSelling,
      isWatchAndShop: req.body.isWatchAndShop,
      stockQuantity: req.body.stockQuantity,
    });

    newProduct.save().then((prod) => {
      console.log(prod, "production");
      res.json(prod);
    });
  } catch (error) {
    return res.status(500).json({
      error: error.message,
    });
  }
};

exports.getAllProduct = async (req, res, next) => {
  const {
    search,
    sort,
    minPrice,
    maxPrice,
    categoryId,
    isNewArrivals,
    isBestSelling,
  } = req.query;
  try {
    let query = {};
    // Search products by name if a search query is provided
    if (search) {
      query.name = { $regex: search, $options: "i" };
    }

    // if (isNewArrivals !== undefined) {
    //   query.isNewArrivals = isNewArrivals === "true";

    //   console.log(query, "query");
    // }

    // // Check if isBestSelling filter is provided
    // if (isBestSelling !== undefined) {
    //   query.isBestSelling = isBestSelling === "true";
    // }

    if (categoryId !== undefined && categoryId !== "") {
      // console.log(categoryId, "++++++++");
      query.category = categoryId;
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
      .populate("images")
      .sort(sortOption);

    // console.log(products, "products");

    res
      .status(201)
      .json({ message: "success fully get products", data: products });
    // console.log("all items find");
  } catch (err) {
    res.status(500).json({ error: "Error fetching products" });
  }
};

// exports.getAllProduct = async (req, res, next) => {
//   const data = await Product.find()
//     .populate("category")
//     .populate("subCategory");
//   res.status(201).json({ message: "success fully get products", data: data });
//   console.log("all items find");
// };

exports.deleteProduct = async (req, res, next) => {
  console.log(req.params.productId, "req params id");
  try {
    const deleteProductData = await Product.findByIdAndRemove(
      req.params.productId
    );

    // console.log(deleteProductData, "deleteproduct data");

    res.status(201).json({
      message: "success fully deleted Product",
      data: deleteProductData,
    });
  } catch (error) {
    console.log("error", error);
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
  // console.log(req.params.productId, "product id");
  // console.log(req.body, "req body");
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

        console.log(newPath, "results");
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

    // console.log(urls, videoUrl, "image and video url");

    const product = await Product.findOne({ _id: req.params.productId });

    if (!product) {
      return res.status(404).json({ error: "Product not found" });
    }

    // Append the new images to the existing ones
    let newImages = product.image;
    console.log(urls, "urls");
    console.log(newImages, "newImages");

    let updatedData = [...newImages, ...urls];
    console.log(updatedData, "updatedData");

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
        details: req.body.details,
        isNewArrivals: req.body.isNewArrivals,
        isBestSelling: req.body.isBestSelling,
      },
      {
        new: true,
      }
    );
    console.log(updatedProductData, "udpated Product data");
    res.status(201).json({
      message: "success fully udpated Product",
      data: updatedProductData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getProductDetailsById = async (req, res, next) => {
  try {
    const productId = req.params.productId;
    const productDetails = await Product.findById(productId)
      .populate("category")
      .populate("images")
      .populate("subCategory");

    console.log(productDetails, "productdetails");

    if (!productDetails) {
      return res.status(404).json({ error: "Product not found" });
    }

    res.status(201).json({
      message: "successfully get Product Details",
      data: productDetails,
    });
  } catch (error) {
    console.log(error, "error");
  }
};

exports.productListByCategory = async (req, res, next) => {
  try {
    const categoryId = req.params.categoryId;
    const productListByCategory = await Product.find({
      category: categoryId,
    });

    console.log(productListByCategory, "rpoduct list by category");

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
    console.log(error, "error");
  }
};

exports.CreateProductImage = async (req, res, next) => {
  console.log("hitted prodcut images", req.files);

  const remappedImages = req?.files?.map((file) => file.filename);
  console.log(remappedImages, "remappedImages hai ta");
  try {
    const ProductImages = new ProductImage({
      colorName: req.body.colorName,
      coloredImage: remappedImages,
    });

    // Save the banner

    const datas = await ProductImages.save();
    console.log(datas, "datas");
    res.status(201).json({
      message: "successfully created productImage",
      data: datas,
    });
  } catch (error) {}
};

exports.deleteProductColorVariantImages = async (req, res, next) => {
  console.log(req.params, "req.params");
  // const { productId, imroageId } = req.params;
  const { variantId, imageId } = req.params;
  console.log(variantId, imageId, "id hai ta ");

  try {
    // Find the product by ID

    const productvariantImage = await ProductImage.findOne({ _id: variantId });
    console.log(productvariantImage, "product found");

    if (!productvariantImage) {
      return res.status(404).json({ error: "Product color variant not found" });
    }

    // Find the image within the product's images array by its ID
    const imageIndex = productvariantImage.coloredImage.findIndex(
      (img) => img == imageId
    );
    console.log(imageIndex, "imageindex");

    if (imageIndex === -1) {
      return res
        .status(404)
        .json({ error: "Image variant not found in the product" });
    }

    // Remove the image from the product's images array
    const deletedImage = productvariantImage?.coloredImage.splice(
      imageIndex,
      1
    )[0];

    // Save the modified product to update the images array in the database
    await productvariantImage.save();

    // Delete the image from Cloudinary using its public ID
    // await cloudinary.uploader.destroy(deletedImage._id);

    res.json({ message: "variant Image deleted successfully" });
  } catch (error) {
    console.error("Error deleting image from Cloudinary:", error);
    res.status(500).json({ error: "Internal server error" });
  }
};

exports.getAllProductVariantImages = async (req, res, next) => {
  // const count = req.params.count;

  // myArray.slice(-3);
  const data = await ProductImage.find();

  const lastdata = data.slice(-req.params.count);
  res
    .status(201)
    .json({ message: "success fully get Product color Variant", data: data });
};
