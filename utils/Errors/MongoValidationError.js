const mongoValidation = { status: 409, message: "Email already used" };

class MongoValidationError extends Error {
  constructor(message = mongoValidation.message) {
    super(message);
    this.statusCode = mongoValidation.status;
  }
}

module.exports = MongoValidationError;
