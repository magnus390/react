const Order = require("../models/Order");

const getOrder = async (req, res) => {
    try {
        let result = await Order.find().populate("userid");

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Orders Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const getOrderById = async (req, res) => {
    try {
        let id = req.params.id;

        let result = await Order.findById(id)
            .populate("userid")
            .populate("itemToDeliver.itemid");
        if (result) {
            res.status(200).send([result]);
        } else {
            res.status(404).send("Orders Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const createOrder = async (req, res) => {
    try {
        let item = {
            itemid: req.body.itemid,
            discount: req.body.discount,
            validTill: req.body.validTill,
        };
        let result = await Order.create(item);

        if (result) {
            res.status(200).send("Order Added!");
        } else {
            res.status(401).send("Ooops Error!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const updateOrder = async (req, res) => {
    try {
        let id = req.params.id;
        let updatedItem = {
            _id: id,
            itemid: req.body.itemid,
            discount: req.body.discount,
            validTill: req.body.validTill,
        };

        let result = await Order.findByIdAndUpdate(id, updatedItem);
        res.status(200).send({ id: result._id });
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const updateOrderStatus = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Order.updateOne(
            { _id: id },
            { $set: { status: req.body.status } }
        );
        res.status(200).send({ id: result._id });
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const deleteOrder = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Order.deleteOne({ _id: id });

        if (result.deletedCount) {
            res.status(200).send("Order Deleted!");
        } else {
            res.status(401).send("Order Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = {
    getOrder,
    getOrderById,
    createOrder,
    updateOrder,
    deleteOrder,
    updateOrderStatus,
};