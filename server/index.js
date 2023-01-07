const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const app = express();

const url = "mongodb+srv://admin:admin@shophere.goowmfm.mongodb.net/test";

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

app.listen("3002",()=> {
    
});
