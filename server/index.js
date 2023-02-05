const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();
const url = "mongodb+srv://admin:admin@shophere.goowmfm.mongodb.net/test";
const Razorpay = require("razorpay");
const {config} = require("dotenv");

config({ path: "./config/config.env" });

mongoose.connect(url, { useNewUrlParser: true, useUnifiedTopology: true});
mongoose.connection.once("open", ()=> {
    console.log("connected");
})

//middlewares
app.use(cors());
app.use(bodyParser.json({ limit: "30mb", extended: true }));
app.use(bodyParser.urlencoded({ limit: "30mb", extended: true }));

const authRouter = require("./routes/Auth");
app.use("/auth",authRouter);
const userRouter = require("./routes/Users");
app.use("/user",userRouter);
const productRouter = require("./routes/Product");
app.use("/product",productRouter);
const cartRouter = require("./routes/Cart");
app.use("/order",cartRouter);
const paymentRouter = require("./routes/Payment");
app.use("/api",paymentRouter);


app.listen("3002",()=> {
    
});
