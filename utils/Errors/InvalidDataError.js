const invalidData = { status: 400, message: "Invalid data" };

class InvalidDataError extends Error {
  constructor(message = invalidData.message) {
    super(message);
    this.statusCode = invalidData.status;
  }
}

module.exports = InvalidDataError;
