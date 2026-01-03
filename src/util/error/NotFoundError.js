const AppError = require('./AppError');

class NotFoundError extends AppError {
  constructor(message = 'Resource Not Found') {
    super(message, 404);
    console.log(this.statusCode);
  }
}
module.exports = NotFoundError;
