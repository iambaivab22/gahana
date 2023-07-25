const express = require("express");

const {
  createCategory,
  getAllCategory,
  getAllSubCategory,
  createSubCategory,
  updateCategory,
} = require("../controllers/categoryController");

const router = express.Router();
router.post("/category/new", createCategory);
router.get("/category", getAllCategory);
router.get("/subCategory", getAllSubCategory);
router.patch("/category/:categoryId", updateCategory);
router.post("/subCategory/new", createSubCategory);
module.exports = router;
