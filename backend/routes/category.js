const express = require("express");
const router = express.Router();
const { check } = require("express-validator");
const {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} = require("../controllers/CategoryController");
const checkValidationMiddleware = require("../middleware/checkValidationMiddleware");

router.get("/", getCategory);

router.get("/:id", getCategoryById);

router.post(
    "/",
    [check("name", "name is required").not().isEmpty()],
    checkValidationMiddleware,
    createCategory
);

router.put("/:id", updateCategory);

router.delete("/:id", deleteCategory);

module.exports = router;