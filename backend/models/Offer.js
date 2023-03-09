var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const OfferSchema = new Schema({
    itemid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
        required: true,
    },
    discount: {
        type: Number,
        required: true,
    },
    validTill: {
        type: Date,
        require: true,
    },
});

module.exports = mongoose.model("Offer", OfferSchema);