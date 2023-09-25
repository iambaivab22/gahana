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
} = require("../controllers/categoryController");

const router = express.Router();
router.post("/category/new", createCategory);
router.get("/category", getAllCategory);

router.delete("/category/:categoryId", deleteCategory);
router.patch("/category/:categoryId", updateCategory);
// router.patch("/category/:categoryId", updateCategory);
router.post("/subCategory/new", createSubCategory);
router.post("/subCategory/:categoryId", addSubCategoryToCategory);

router.get("/subCategory", getAllSubCategory);
router.patch("/subCategory/:subCategoryId", updateSubCategory);
router.delete("/subCategory/:subCategoryId", deleteSubCategory);
module.exports = router;
