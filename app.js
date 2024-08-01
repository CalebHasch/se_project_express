const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { notFound } = require("./utils/error");

const { PORT = 3001 } = process.env;

const app = express();

const auth = require("./middlewares/auth");

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("connected to db"))
  .catch(console.error);

app.use(cors());
app.use(express.json());

app.use("/users/private", auth);
app.use("/items/private", auth);
app.use("/users", require("./routes/user"));
app.use("/items", require("./routes/clothingItem"));

app.use((req, res) => {
  res.status(notFound.status).send({ message: notFound.message });
});

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
