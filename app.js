const express = require("express");
const mongoose = require("mongoose");
const { notFound } = require("./utils/error");

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("connected to db"))
  .catch(console.error);

app.use((req, res, next) => {
  req.user = {
    _id: "669a6bb178815f80aa9c2e31",
  };
  next();
});
app.use(express.json());
app.use("/users", require("./routes/user"));
app.use("/items", require("./routes/clothingItem"));

app.use((req, res) => {
  res.status(notFound.status).send({ message: notFound.message });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
