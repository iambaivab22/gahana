const Testimonial = require("../modals/testimonial.modal");

exports.updatedTestimonial = async (req, res) => {
  const { testimonialImage, testimonialDescription } = req.body;

  try {
    const updatedTestimonial = await Testimonial.findByIdAndUpdate(
      req.params.id,
      { testimonialImage, testimonialDescription },
      { new: true }
    );

    if (!updatedTestimonial) {
      return res.status(404).json({ error: "Testimonial not found" });
    }

    res.json({
      data: updatedTestimonial,
      message: "Testimonial Updated successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

exports.createTestimonial = async (req, res, next) => {
  try {
    console.log("hitted Testimonial", req.files);

    const fileNames = req.files.map((file) => file.filename);

    console.log(fileNames, "fileNames hai ta");

    // console.log(datas, "from Test");

    const testimonial = new Testimonial({
      testimonialImage: fileNames,
      testimonialDescription: req.body.testimonialDescription,
    });

    const datas = await testimonial.save();
    res.status(201).json({
      message: "success fully created testimonial",
      data: datas,
    });
  } catch (error) {}
};

exports.getAllTestimonial = async (req, res, next) => {
  const data = await Testimonial.find();
  res
    .status(201)
    .json({ message: "success fully got Testimonial", data: data });
};

exports.deleteTestimonial = async (req, res, next) => {
  //   console.log(req.params.productId, "req params id");
  try {
    const deleteTestimonialData = await Testimonial.findByIdAndRemove(
      req.params.testimonialId
    );

    // console.log(deleteProductData, "deleteproduct data");

    res.status(201).json({
      message: "success fully deleted Testimonial",
      data: deleteTestimonialData,
    });
  } catch (error) {
    console.log("error", error);
  }
};
