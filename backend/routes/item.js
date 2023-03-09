const express = require("express");
const router = express.Router();

const {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    updateReview,
} = require("../controllers/ItemController");

router.get("/", getItems);

router.get("/:itemID", getItemById);

router.post("/", createItem);

router.put("/:itemID", updateItem);

router.put("/review/:itemID", updateReview);

router.delete("/:itemID", deleteItem);

module.exports = router;