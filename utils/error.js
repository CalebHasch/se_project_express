const invalidData = { status: 400, message: "Invalid data" };
const invalidLogin = { status: 401, message: "Invalid email or password" };
const notAuthorized = { status: 403, message: "Not authorized owner" };
const notFound = { status: 404, message: "Not found" };
const defaultError = {
  status: 500,
  message: "An error has occurred on the server",
};

module.exports = {
  invalidData,
  invalidLogin,
  notAuthorized,
  notFound,
  defaultError,
};
