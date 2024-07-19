const express = require("express");
const mongoose = require("mongoose");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("connected to db"))
  .catch(console.error);

app.use(express.json());
app.use("/users", require("./routes/user"));
app.use("/items", require("./routes/clothingItem"));

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
