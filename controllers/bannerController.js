const Banner = require("../modals/banner.modal");
const cloudinary = require("cloudinary").v2;

exports.createBanner = async (req, res, next) => {
  try {
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

    const bannerData = new Banner({ image: urls });
    const createBannerData = await bannerData.save();
    res.status(201).json({
      message: "success fully created banner",
      data: createBannerData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.deleteBanner = async (req, res, next) => {
  try {
    const deleteBannerData = await Banner.deleteOne(
      {
        _id: req.params.bannerId,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      message: "success fully deleted Banner",
      data: deleteBannerData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.updateBanner = async (req, res, next) => {
  try {
    console.log(req.files, "file path");

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

    const updatebannerData = await Banner.findOneAndUpdate(
      { _id: req.params.bannerId },
      { image: urls },
      {
        new: true,
      }
    );

    console.log(updatebannerData, "udpate banner data");

    res.status(201).json({
      message: "success fully udpated banner data",
      data: updatebannerData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getAllBanner = async (req, res, next) => {
  const data = await Banner.find();
  res.status(201).json({ message: "success fully get Banner", data: data });
};
