const notFound = { status: 404, message: "Not founds" };

class NotFoundError extends Error {
  constructor(message = notFound.message) {
    super(message);
    this.statusCode = notFound.status;
  }
}

module.exports = NotFoundError;
