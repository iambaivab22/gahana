const Product = require("../modals/product.modal");
const cloudinary = require("cloudinary").v2;

cloudinary.config({
  cloud_name: "domtfu3ua",
  api_key: "551591611862363",
  api_secret: "KNvSA3_VXBB7zwSgMCR8QUM1BOM",
});

exports.createProduct = async (req, res, next) => {
  try {
    console.log(req.files.image, "file path");
    console.log(req.files.video[0], "video");
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

    const newProduct = new Product({
      name: req.body.name,
      price: req.body.price,
      image: urls,
      video: videoUrl,
      originalPrice: req.body.originalPrice,
      discountedPrice: req.body.discountedPrice,
    });

    // res.json({ success: "success" });

    newProduct.save().then((prod) => {
      console.log(prod, "prod");
      res.json(prod);
    });

    console.log("it is called");
  } catch (error) {
    return next(error);
  }
};

exports.getAllProduct = async (req, res, next) => {
  const data = await Product.find();
  res.status(201).json({ message: "success fully get products", data: data });
  console.log("all items find");
};
