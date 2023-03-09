const express = require("express");
const router = express.Router();

const {
    getOrder,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
} = require("../controllers/OrderController");

router.get("/", getOrder);

router.get("/:id", getOrderById);

router.post("/", createOrder);

router.put("/:id", updateOrder);

router.put("/updateStatus/:id", updateOrderStatus);

router.delete("/:id", deleteOrder);

module.exports = router;