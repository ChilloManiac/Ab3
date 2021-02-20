const { HttpError } = require("../../middleware/errorHandler");
const userService = require("./user.service");

function login(req, res, next) {
  userService
    .login(req.body.username, req.body.password)
    .then((response) => res.status(200).json(response))
    .catch((error) => next(error));
}

function register(req, res, next) {
  if (!req.body.username || !req.body.role || !req.body.password) {
    throw new HttpError(400, "Username, role and password must be specified.");
  }
  userService
    .register(req.body.username, req.body.role, req.body.password)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
}

function changeRole(req, res, next) {
  if (!req.body.username || !req.body.role) {
    throw new HttpError(400, "Username and role must be specified.");
  }
  userService
    .changeRole(req.body.username, req.body.role)
    .then((response) => res.status(200).send(response))
    .catch((error) => next(error));
}

module.exports = {
  login,
  register,
  changeRole,
};
