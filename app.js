const express = require("express");
const mongoose = require("mongoose");
// const bodyParser = require("body-parser");
// const path = require("path");

const { PORT = 3001 } = process.env;

const app = express();

// app.use(bodyParser.json());
// app.use(bodyParser.urlencoded({ extended: true }));

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use("./users", require("./routes/user"));
app.use("./items", require("./routes/clothingItem"));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
