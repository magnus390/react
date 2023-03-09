const Item = require("../models/Item");

const getItems = async (req, res) => {
    try {
        let result = await Item.find().populate("category");

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Result Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const getItemById = async (req, res) => {
    try {
        let id = req.params.itemID;

        let result = await Item.findById(id);
        if (result) {
            res.status(200).send([result]);
        } else {
            res.status(404).send("No result found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const createItem = async (req, res) => {
    try {
        console.log(req.body);
        let item = {
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            discount: req.body.discount,
            quantity: req.body.quantity,
            description: req.body.description,
            category: req.body.category,
            photo: req.body.photo,
        };

        let result = await Item.create(item);

        if (result) {
            res.status(200).send("Item Added!");
        } else {
            res.status(401).send("Ooops Error!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const updateReview = async (req, res) => {
    try {
        console.log(req.body);
        let id = req.params.itemID;
        let updatedItem = {
            reviews: req.body.reviews,
        };

        let result = await Item.updateOne(
            { _id: id },
            {
                $push: { reviews: { ...updatedItem } },
            }
        );
        res.status(200).send({ id: result._id });
    } catch (error) {
        res.status(401).send(error.message);
    }
};
const updateItem = async (req, res) => {
    try {
        let id = req.params.itemID;
        let updatedItem = {
            _id: id,
            name: req.body.name,
            price: req.body.price,
            category: req.body.category,
            offerid: req.body.offerid,
            quantity: req.body.quantity,
            description: req.body.description,
            category: req.body.category,
            reviews: req.body.reviews,
        };

        let result = await Item.findByIdAndUpdate(id, updatedItem);
        res.status(200).send({ id: result._id });
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const deleteItem = async (req, res) => {
    try {
        let id = req.params.itemID;
        let result = await Item.deleteOne({ _id: id });

        if (result.deletedCount) {
            res.status(200).send("Item Deleted!");
        } else {
            res.status(401).send("Item Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = {
    getItems,
    getItemById,
    createItem,
    updateItem,
    deleteItem,
    updateReview,
};