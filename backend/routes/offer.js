const express = require("express");
const router = express.Router();

const {
    getOffer,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
} = require("../controllers/OfferController");

router.get("/", getOffer);

router.get("/:id", getOfferById);

router.post("/", createOffer);

router.put("/:id", updateOffer);

router.delete("/:id", deleteOffer);

module.exports = router;