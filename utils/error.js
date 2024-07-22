const invalidData = { status: 400, message: "Invalid data" };
const notFound = { status: 404, message: "Not found" };
const defaultError = {
  status: 500,
  message: "An error has occurred on the server",
};

module.exports = { invalidData, notFound, defaultError };
