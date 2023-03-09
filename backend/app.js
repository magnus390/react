const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const path = require("path");
const mongoose = require("mongoose");
const morgan = require("morgan");
require("dotenv").config();

const authRoute = require("./routes/authRoutes");
const userRoute = require("./routes/userRoutes");
const itemRoute = require("./routes/item");
const wishRoute = require("./routes/wish");
const offerRoute = require("./routes/offer");
const cartRoute = require("./routes/cart");
const categoryRoute = require("./routes/category");
const orderRoute = require("./routes/order");

const port = process.env.PORT || 8000;

app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.use(express.static("public"));

app.use("/images", express.static("uploads"));

app.use(morgan("tiny"));
app.use(express.static(path.join(__dirname, "dist")));

app.use("/api/users", userRoute);
app.use("/api/auth", authRoute);
app.use("/api/item", itemRoute);
app.use("/api/wish", wishRoute);
app.use("/api/offer", offerRoute);
app.use("/api/cart", cartRoute);
app.use("/api/category", categoryRoute);
app.use("/api/order", orderRoute);

const dbConString = process.env.CONN_STRING;

mongoose
    .connect(dbConString)
    .then((res) => {
        console.log("Database Connection Successfully!!");
    })
    .catch((error) => {
        console.log(error);
    });

app.get("/*", (req, res) => {
    res.sendFile(path.join(__dirname, "dist", "index.html"));
});
app.listen(port, () => {
    console.log("App Listening On Port : " + port);
});