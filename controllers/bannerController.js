const Banner = require("../modals/banner.modal");

exports.createBanner = async (req, res, next) => {
  try {
    console.log("hitted", req.file);

    const fileNames = req.files.map((file) => file.filename);

    const bannerImage = new Banner({ bannerImage: fileNames });
    const datas = await bannerImage.save();

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
