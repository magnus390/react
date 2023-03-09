const Category = require('../models/Category');
const getCategory = async (req, res) => {
    try {
        let result = await Category.find();
        console.log(result);
        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Result Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const getCategoryById = async (req, res) => {
    try {
        let id = req.params.id;

        let result = await Category.findById(id);
        if (result) {
            res.status(200).send([result]);
        } else {
            res.status(404).send("No result found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const createCategory = async (req, res) => {
    console.log("called");
    try {
        let category = {
            name: req.body.name,
            description: req.body.description,
        };

        let result = await Category.create(category);
        if (result) {
            console.log(result);
            res.status(200).send("Category Added!");
        } else {
            res.status(401).send("Ooops Error!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const updateCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let updatedItem = {
            _id: id,
            name: req.body.name,
            description: req.body.description,
        };

        let result = await Category.findByIdAndUpdate(id, updatedItem);
        res.status(200).send({ id: result._id });
    } catch (error) {
        res.status(401).send(error.message);
    }
};

const deleteCategory = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Category.deleteOne({ _id: id });

        if (result.deletedCount) {
            res.status(200).send("Category Deleted!");
        } else {
            res.status(401).send("Category Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
};

module.exports = {
    getCategory,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory
}