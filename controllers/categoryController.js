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
  console.log(req.params.categoryId, "category id");
  console.log(req.body, "req body");
  try {
    const updatedCategoryData = await Category.Category.findByIdAndUpdate(
      { _id: req.params.categoryId },
      req.body,
      {
        new: true,
      }
    );
    console.log(updatedCategoryData, "udpate ctegory data");
    res.status(201).json({
      message: "success fully udpated  categories",
      data: updatedCategoryData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.getAllCategory = async (req, res, next) => {
  const data = await Category.Category.find().populate("subCategories");
  res.status(201).json({ message: "success fully get categories", data: data });
  console.log("all items find");
};

exports.deleteCategory = async (req, res, next) => {
  console.log(req.params.categoryId, "req params id");
  try {
    const deleteCategoryData = await Category.Category.deleteOne(
      {
        _id: req.params.categoryId,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      message: "success fully deleted Category",
      data: deleteCategoryData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.addSubCategoryToCategory = async (req, res, next) => {
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

// for subCategory Section

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

exports.deleteSubCategory = async (req, res, next) => {
  console.log(req.params.subCategoryId, "req params id");
  try {
    const deleteSubCategoryData = await Category.SubCategory.deleteOne(
      {
        _id: req.params.subCategoryId,
      },
      {
        new: true,
      }
    );

    res.status(201).json({
      message: "success fully deleted subcategory",
      data: deleteSubCategoryData,
    });
  } catch (error) {
    console.log("error", error);
  }
};

exports.updateSubCategory = async (req, res, next) => {
  try {
    console.log(req.params.subCategoryId, "sub category data");
    const udpateSubCategoryData = await Category.SubCategory.findOneAndUpdate(
      { _id: req.params.subCategoryId },
      req.body,
      {
        new: true,
      }
    );

    console.log(udpateSubCategoryData, "udpate subcategory data");

    res.status(201).json({
      message: "success fully udpated  subcategories",
      data: udpateSubCategoryData,
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
