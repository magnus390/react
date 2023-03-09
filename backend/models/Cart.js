var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CartSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    itemid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
    quantity: {
        type: Number,
        require: true,
    },
});

module.exports = mongoose.model("Cart", CartSchema);