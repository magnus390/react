const express = require("express");
const router = express.Router();

const {
    getWishes,
    getWishById,
    createWish,
    updateWish,
    deleteWish,
} = require("../controllers/WishController");

router.get("/", getWishes);

router.get("/:id", getWishById);

router.post("/", createWish);

router.put("/:id", updateWish);

router.delete("/:id", deleteWish);

module.exports = router;