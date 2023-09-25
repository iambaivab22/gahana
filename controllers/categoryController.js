const Category = require("../modals/category.modal");

exports.createCategory = async (req, res, next) => {
  try {
    const categoryData = new Category.Category(req.body);

    const createCategoryData = await categoryData.save();
    res.status(201).json({
      message: "success fully get categories",
      data: createCategoryData,
    });
  } catch (error) {}
};

exports.updateCategory = async (req, res, next) => {
  try {
    const updatedCategoryData = await Category.Category.findByIdAndUpdate(
      { _id: req.params.categoryId },
      req.body,
      {
        new: true,
      }
    );
    res.status(201).json({
      message: "success fully udpated  categories",
      data: updatedCategoryData,
    });
  } catch (error) {}
};

exports.getAllCategory = async (req, res, next) => {
  const data = await Category.Category.find().populate("subCategories");
  res.status(201).json({ message: "success fully get categories", data: data });
};

exports.deleteCategory = async (req, res, next) => {
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
  } catch (error) {}
};

exports.addSubCategoryToCategory = async (req, res, next) => {
  try {
    const updatedCategoryDataCategory =
      await Category.Category.findOneAndUpdate(
        { _id: req.params.categoryId },
        { $push: { subCategories: req.body.subCategoryId } },
        {
          new: true,
        }
      );

    res.status(201).json({
      message: "success fully updated categories",
      data: updatedCategoryDataCategory,
    });
  } catch (error) {}
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
  } catch (error) {}
};

exports.deleteSubCategory = async (req, res, next) => {
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
  } catch (error) {}
};

exports.updateSubCategory = async (req, res, next) => {
  try {
    const udpateSubCategoryData = await Category.SubCategory.findOneAndUpdate(
      { _id: req.params.subCategoryId },
      req.body,
      {
        new: true,
      }
    );

    res.status(201).json({
      message: "success fully udpated  subcategories",
      data: udpateSubCategoryData,
    });
  } catch (error) {}
};

exports.getAllSubCategory = async (req, res, next) => {
  const data = await Category.SubCategory.find();
  res
    .status(201)
    .json({ message: "success fully get subcategories", data: data });
};
