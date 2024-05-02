const Banner = require("../modals/banner.modal");

// const findOrCreateBanner = async () => {
//   let existingBanner = await Banner.findOne();

//   if (!existingBanner) {
//     // If no banner exists, create a new one
//     existingBanner = await new Banner();
//     await existingBanner.save();
//   }

//   return existingBanner;
// };

exports.createBanner = async (req, res, next) => {
  try {
    console.log("hitted banner", req.files);

    let banner = await Banner.findOne();

    if (!banner) {
      // If no banner exists, create a new one
      banner = new Banner();
    }

    // Get image filenames from the uploaded files
    const fileNames = req.files.map((file) => file.filename);

    console.log(fileNames, "fileNames hai ta");

    // Add image filenames to the banner's bannerImages array
    banner.bannerImage = [...(banner.bannerImage || []), ...fileNames];

    // Save the banner
    const datas = await banner.save();

    console.log(datas, "from banner");

    // const fileNames = req.files.map((file) => file.filename);

    // const bannerImage = new Banner({ bannerImage: fileNames });
    // const datas = await bannerImage.save();

    res.status(201).json({
      message: "success fully creaete banner",
      data: datas,
    });
  } catch (error) {}
};

exports.getAllBanner = async (req, res, next) => {
  const data = await Banner.find();
  res.status(201).json({ message: "success fully get Banner", data: data });
};

exports.deleteBannerImage = async (req, res, next) => {
  try {
    const { imageName } = req.params;

    // Find the banner
    const banner = await Banner.findOne();

    if (!banner) {
      return res.status(404).send("Banner not found");
    }

    // Remove the specified imageName from the banner's bannerImages array
    banner.bannerImage = banner.bannerImage.filter(
      (image) => image !== imageName
    );

    // Save the updated banner
    const datas = await banner.save();

    res
      .status(201)
      .json({ message: "successfully deleted Banner", data: datas });
  } catch (error) {
    res.status(201).json({ message: "error occured" });
  }
};
