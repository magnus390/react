var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const ItemSchema = new Schema({
    name: { type: String, require: true },
    price: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
    },
    discount: {
        type: Number,
        ref: "Offer",
    },
    quantity: { type: Number, required: true },
    description: { type: String },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Category",
    },
    reviews: [Object],
});

module.exports = mongoose.model("Item", ItemSchema);