const Product = require("../modals/product.modal");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "domtfu3ua",
  api_key: "551591611862363",
  api_secret: "KNvSA3_VXBB7zwSgMCR8QUM1BOM",
});

exports.createProduct = async (req, res, next) => {
  try {
    console.log("create product is called");
    // const uploader = async (path) => await cloudinary.uploads(path, "Images");
    const urls = [];
    let videoUrl;

    for (const file of req.files.image) {
      const { path } = file;
      const newPath = await cloudinary.uploader.upload(
        path,
        // { public_id: "" },
        { resource_type: "auto" },
        function (error, result) {
          if (result) {
            urls.push(result.secure_url);
          }
        }
      );
    }

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

    console.log(urls, videoUrl, "image and video url");
    console.log("it is called");
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

    // res.json({ success: "success" });

    newProduct.save().then((prod) => {
      console.log(prod, "production");
      res.json(prod);
    });
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
    // Filter products by price range if minPrice and maxPrice are provided
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
    console.log("all items find");
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

    console.log(deleteProductData, "deleteproduct data");

    res.status(201).json({
      message: "success fully deleted Product",
      data: deleteProductData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.updateProduct = async (req, res, next) => {
  console.log(req.params.productId, "product id");
  console.log(req.body, "req body");
  try {
    const urls = [];
    let videoUrl;

    for (const file of req.files.image) {
      const { path } = file;
      const newPath = await cloudinary.uploader.upload(
        path,
        // { public_id: "" },
        { resource_type: "auto" },
        function (error, result) {
          if (result) {
            urls.push(result.secure_url);
          }
        }
      );
    }

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

    console.log(urls, videoUrl, "image and video url");
    console.log("it is called");

    const updatedProductData = await Product.findByIdAndUpdate(
      { _id: req.params.productId },
      {
        name: req.body.name,
        price: req.body.price,
        image: urls,
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
    const productDetails = await Product.findById(productId);

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
