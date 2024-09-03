const invalidLogin = { status: 401, message: "Invalid email or password" };

class InvalidLoginError extends Error {
  constructor(message = invalidLogin.message) {
    super(message);
    this.statusCode = invalidLogin.status;
  }
}

module.exports = InvalidLoginError;
