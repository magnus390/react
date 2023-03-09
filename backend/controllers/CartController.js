const Cart = require("../models/Cart");

const getCart = async (req, res) => {
    try {
        let result = await Cart.find();

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Result Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const getCartById = async (req, res) => {
    try {
        let id = req.params.id;

        let result = await Cart.findById(id);
        if (result) {
            res.status(200).send([result]);
        } else {
            res.status(404).send("No result found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const createCart = async (req, res) => {
    try {
        let cart = {
            userid: req.body.userid,
            itemid: req.body.itemid,
            quantity: req.body.quantity,
        };
        let result = await Cart.create(cart);

        if (result) {
            res.status(200).send("Cart Added!");
        } else {
            res.status(401).send("Ooops Error!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const updateCart = async (req, res) => {
    try {
        let id = req.params.id;
        let updatedItem = {
            _id: id,
            userid: req.body.userid,
            itemid: req.body.itemid,
            quantity: req.body.quantity,
        };

        let result = await Cart.findByIdAndUpdate(id, updatedItem);
        res.status(200).send({ id: result._id });
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const deleteCart = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Cart.deleteOne({ id });

        if (result.deletedCount) {
            res.status(200).send("Cart Deleted!");
        } else {
            res.status(401).send("Cart Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = {
    getCart,
    getCartById,
    createCart,
    updateCart,
    deleteCart,
};