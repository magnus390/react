var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const OrderSchema = new Schema({
    address: {
        type: String,
        required: true,
    },
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    selectedDay: {
        type: Date,
        required: true,
    },
    orderDate: {
        type: Date,
        required: true,
    },
    total: {
        type: Number,
        required: true,
    },
    status: {
        type: Number,
        required: true,
    },
    itemToDeliver: [
        {
            itemid: {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Item",
            },
            quantity: {
                type: Number,
                required: true,
            },
            price: {
                type: Number,
                required: true,
            },
        },
    ],
});

module.exports = mongoose.model("Order", OrderSchema);