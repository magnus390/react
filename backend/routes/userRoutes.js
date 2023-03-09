const express = require("express");
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv").config();
const { default: mongoose } = require("mongoose");
let User = mongoose.model("User");

const router = express.Router();
const bcrypt = require("bcryptjs");
const multer = require("multer");

const jwt = require("jsonwebtoken");
const checkValidationMiddleware = require("../middleware/checkValidationMiddleware");

var storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, __dirname + "/../uploads/");
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + "-" + file.originalname);
    },
});

var upload = multer({
    storage: storage,
});

router.get("/", async (req, res) => {
    try {
        let result = await User.find();

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Result Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.get("/:id", async (req, res) => {
    try {
        let result = await User.findById(req.params.id);

        if (result) {
            res.status(200).send(result);
        } else {
            res.status(401).send("Result Not Found!!");
        }
    } catch (error) {
        res.status(401).send(error.message);
    }
});

router.post(
    "/",
    upload.single("photo"),
    [
        check("name", "name is required").not().isEmpty(),
        check("email", "Please enter valid email").isEmail(),
        check("password", "password need to be at least 5 char").isLength({
            min: 5,
        }),
    ],
    checkValidationMiddleware,
    async (req, res) => {
        try {
            let user1 = await User.findOne({ email: req.body.email });
            if (user1) {
                return res.status(400).json({ errors: "User already exist" });
            }

            const salt = await bcrypt.genSalt(10);
            const password = await bcrypt.hash(req.body.password, salt);
            const newUser = new User({
                name: req.body.name,
                email: req.body.email,
                password: password,
                username: req.body.username,
                gender: req.body.gender,
                phone: req.body.phone,
                isAdmin: req.body.isAdmin,
                photo: req.file?.filename,
            });
            await newUser.save();

            const payload = {
                user: {
                    id: newUser.id,
                    name: newUser.name,
                    isAdmin: newUser.isAdmin,
                },
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: 36000 },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token });
                }
            );
        } catch (err) {
            console.log(err);
            res.status(500).json({ error: "Server error" });
        }
    }
);

module.exports = router;