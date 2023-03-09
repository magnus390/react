const WishList = require("../models/Wishlist");

const getWishes = async (req, res) => {
    try {
        let result = await WishList.find();

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Result Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const getWishById = async (req, res) => {
    try {
        let id = req.params.id;

        let result = await WishList.findById(id);
        if (result) {
            res.status(200).send([result]);
        } else {
            res.status(404).send("No result found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const createWish = async (req, res) => {
    try {
        let item = {
            userid: req.body.userid,
            itemid: req.body.itemid,
        };
        let result = await WishList.create(item);

        if (result) {
            res.status(200).send("WishList Added!");
        } else {
            res.status(401).send("Ooops Error!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const updateWish = async (req, res) => {
    try {
        let id = req.params.id;
        let updatedItem = {
            _id: id,
            userid: req.body.userid,
            itemid: req.body.itemid,
        };

        let result = await WishList.findByIdAndUpdate(id, updatedItem);
        res.status(200).send({ id: result._id });
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const deleteWish = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await WishList.deleteOne({ _id: id });

        if (result.deletedCount) {
            res.status(200).send("WishList Deleted!");
        } else {
            res.status(401).send("WishList Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = {
    getWishes,
    getWishById,
    createWish,
    updateWish,
    deleteWish,
};