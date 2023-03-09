const express = require("express");
const router = express.Router();

const {
    getCart,
    getCartById,
    createCart,
    updateCart,
    deleteCart,
} = require("../controllers/CartController");

router.get("/", getCart);

router.get("/:id", getCartById);

router.post("/", createCart);

router.put("/:id", updateCart);

router.delete("/:id", deleteCart);

module.exports = router;