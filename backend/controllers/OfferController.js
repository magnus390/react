const Offer = require("../models/Offer");

const getOffer = async (req, res) => {
    try {
        let result = await Offer.find();

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Result Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const getOfferById = async (req, res) => {
    try {
        let id = req.params.id;

        let result = await Offer.findById(id);
        if (result) {
            res.status(200).send([result]);
        } else {
            res.status(404).send("No result found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const createOffer = async (req, res) => {
    try {
        let item = {
            itemid: req.body.itemid,
            discount: req.body.discount,
            validTill: req.body.validTill,
        };
        let result = await Offer.create(item);

        if (result) {
            res.status(200).send("Offer Added!");
        } else {
            res.status(401).send("Ooops Error!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const updateOffer = async (req, res) => {
    try {
        let id = req.params.id;
        let updatedItem = {
            _id: id,
            itemid: req.body.itemid,
            discount: req.body.discount,
            validTill: req.body.validTill,
        };

        let result = await Offer.findByIdAndUpdate(id, updatedItem);
        res.status(200).send({ id: result._id });
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const deleteOffer = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Offer.deleteOne({ _id: id });

        if (result.deletedCount) {
            res.status(200).send("Offer Deleted!");
        } else {
            res.status(401).send("Offer Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = {
    getOffer,
    getOfferById,
    createOffer,
    updateOffer,
    deleteOffer,
};