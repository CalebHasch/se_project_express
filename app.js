require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { errors } = require("celebrate");
const { notFound } = require("./utils/error");
const { requestLogger, errorLogger } = require("./middlewares/logger");
const errorHandler = require("./middlewares/errorHandler");

const corsOptions = {
  origin: [
    "https://calebhaschwtwr.crabdance.com",
    "https://www.calebhaschwtwr.crabdance.com",
  ],
  methods: "GET, HEAD, PUT, PATCH, POST, DELETE",
  credentials: true,
  options: 204,
};

const { PORT = 3001 } = process.env;

const app = express();

mongoose
  .connect("mongodb://127.0.0.1:27017/wtwr_db")
  .then(() => console.log("connected to db"))
  .catch(console.error);

app.use(cors(corsOptions));
app.use(express.json());

app.use(requestLogger);

app.get("/crash-test", () => {
  setTimeout(() => {
    throw new Error("Server will crash now");
  }, 0);
});
app.use("/", require("./routes/index"));

app.use(errorLogger);

app.use((req, res) => {
  res.status(notFound.status).send({ message: notFound.message });
});

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening at port ${PORT}`);
});
