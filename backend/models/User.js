const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = Schema({
    name: {
        type: String,
        require: true,
    },
    username: {
        type: String,
        require: true,
        unique: true,
    },
    email: {
        type: String,
        require: true,
        unique: true,
    },
    password: {
        type: String,
        require: true,
    },
    gender: {
        type: String,
        require: true,
        enum: ["male", "female"],
    },
    isAdmin: { type: Boolean, default: false },
    phone: {
        type: String,
        require: true,
    },
    photo: {
        type: String,
    },
});

module.exports = mongoose.model("User", userSchema);