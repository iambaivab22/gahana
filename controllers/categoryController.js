const Category = require("../modals/category.modal");

exports.createCategory = async (req, res, next) => {
  try {
    console.log("it is called");
    console.log(req.body, "req.body");
    const categoryData = new Category.Category(req.body);

    const createCategoryData = await categoryData.save();
    res.status(201).json({
      message: "success fully get categories",
      data: createCategoryData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.updateCategory = async (req, res, next) => {
  try {
    console.log(req.body.subCategoryId, "update called");
    console.log(req.params.categoryId, " category id");

    const updatedCategoryDataCategory =
      await Category.Category.findOneAndUpdate(
        { _id: req.params.categoryId },
        { $push: { subCategories: req.body.subCategoryId } },
        {
          new: true,
        }
      );

    console.log(updatedCategoryDataCategory, "update category id data");

    res.status(201).json({
      message: "success fully updated categories",
      data: updatedCategoryDataCategory,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getAllCategory = async (req, res, next) => {
  console.log("get called");
  const data = await Category.Category.find().populate("subCategories");
  res.status(201).json({ message: "success fully get categories", data: data });
  console.log("all items find");
};

exports.createSubCategory = async (req, res, next) => {
  try {
    const subCategoryData = new Category.SubCategory(req.body);
    const createSubCategoryData = await subCategoryData.save();
    res.status(201).json({
      message: "success fully create subcategories",
      data: createSubCategoryData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getAllSubCategory = async (req, res, next) => {
  const data = await Category.SubCategory.find();
  res
    .status(201)
    .json({ message: "success fully get subcategories", data: data });
};
