const express = require("express");
const { check, validationResult } = require("express-validator");
const dotenv = require("dotenv").config();
let User = require("../models/User");
const authMiddleware = require("../middleware/authMiddleware");

const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

router.get("/", authMiddleware, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password");
        res.send(user);
    } catch (err) {
        res.status(500).send("server error");
    }
});

router.post(
    "/",
    [
        check("email", "Please enter valid email").isEmail(),
        check("password", "password need to be at least 12 char").isLength({
            min: 5,
        }),
    ],
    async (req, res) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        try {
            const { email, password } = req.body;
            let user = await User.findOne({ email });
            if (!user) {
                return res.status(400).json({ errors: "Invalid credential" });
            }

            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ errors: "Invalid credential 2" });
            }
            const payload = {
                user: {
                    id: user.id,
                    name: user.name,
                    isAdmin: user.isAdmin,
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
            console.log(err.message);
            return res.status(500).json({ error: "Server error" });
        }
    }
);

module.exports = router;