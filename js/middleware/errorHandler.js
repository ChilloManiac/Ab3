function errorHandler(err, res) {
  res.status(err.status || 500);
  res.json("Error: " + (err.message || "Internal server error"));
}

class HttpError extends Error {
  constructor(status, message) {
    super();
    this.status = status;
    this.message = message;
  }
}

module.exports = {
  errorHandler,
  HttpError,
};
