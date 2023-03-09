var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const WishListSchema = new Schema({
    userid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
    },
    itemid: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Item",
    },
});

module.exports = mongoose.model("Wishlist", WishListSchema);