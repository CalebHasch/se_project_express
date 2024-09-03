const notAuthorized = { status: 403, message: "Not authorized owner" };

class NotAuthorizedError extends Error {
  constructor(message = notAuthorized.message) {
    super(message);
    this.statusCode = notAuthorized.status;
  }
}

module.exports = NotAuthorizedError;
