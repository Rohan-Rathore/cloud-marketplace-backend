require("dotenv").config();

const mongoose = require("mongoose");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const cors = require("cors");

//My routes
const authRoutes = require("./routes/auth");
const userRoutes = require("./routes/user");
const serviceRoutes = require("./routes/service");

//DB Connection
mongoose
  .connect(process.env.DATABASE, {    //process attaches all dependencies
    useNewUrlParser: true,
    useUnifiedTopology: true,   
    useCreateIndex: true
  })
  .then(() => {
    console.log("DB CONNECTED!");
 })
 .catch((err) => {
   console.log("DB CONNECTION FAILED..." + err);
 });

//Middlewares
app.use(bodyParser.json());   // for parsing application/json
app.use(cookieParser());
app.use(cors());

//My Routes
app.use("/api", authRoutes);
app.use("/api", userRoutes);
app.use("/api", serviceRoutes);

//PORT
const port = process.env.PORT || 8000;    //if .env port fails it'll use port 8000

//Starting a server
app.listen(port, () => {
  console.log(`App is running at PORT ${port}`);
});