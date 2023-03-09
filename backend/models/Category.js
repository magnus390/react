var mongoose = require("mongoose");
var Schema = mongoose.Schema;

const CategorySchema = new Schema({
    name: { type: String, require: true, unique: true },
    description: { type: String },
});

module.exports = mongoose.model("Category", CategorySchema);