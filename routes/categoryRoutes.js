const express = require("express");

const {
  createCategory,
  getAllCategory,
  getAllSubCategory,
  createSubCategory,
  updateCategory,
  addSubCategoryToCategory,
  updateSubCategory,
  deleteSubCategory,
  deleteCategory,
  getSubCategoryDetailsById,
  getCategoryDetailsById,
} = require("../controllers/categoryController");

const router = express.Router();
router.post("/category/new", createCategory);
router.get("/category", getAllCategory);

router.delete("/category/:categoryId", deleteCategory);
router.patch("/category/:categoryId", updateCategory);
router.get("/category/:categoryId", getCategoryDetailsById);
// router.patch("/category/:categoryId", updateCategory);
router.post("/subCategory/new", createSubCategory);
router.post("/subCategory/:categoryId", addSubCategoryToCategory);

router.get(
  "/subCategory/:subCategoryId",
  (req, res, next) => {
    console.log("hello");

    return next();
  },
  getSubCategoryDetailsById
);

router.get("/subCategory", getAllSubCategory);
router.patch("/subCategory/:subCategoryId", updateSubCategory);
router.delete("/subCategory/:subCategoryId", deleteSubCategory);
module.exports = router;
