const jwt = require("jsonwebtoken");
const { HttpError } = require("./errorHandler");
const User = require("../models/User");
const { Roles } = require("../utilities/role.utility");

function verifyToken(req, res, next) {
  const token = req.header("auth-token");
  if (!token) {
    throw new HttpError(403, "Access denied.");
  }
  try {
    const verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
    req.verifiedUser = verifiedUser;
    next();
  } catch (error) {
    throw new HttpError(403, "Invalid token.");
  }
}

function isAdmin(req, res, next) {
  const verifiedUser = req.verifiedUser;
  if (!verifiedUser) {
    throw new HttpError(403, "Token not verified.");
  }
  User.findOne({ _id: verifiedUser._id })
    .then((user) => {
      if (!user) {
        throw new HttpError(400, "No user with that username exists.");
      }
      if (user.role !== Roles.Admin) {
        throw new HttpError(403, "Administrator privileges required.");
      }
      next();
    })
    .catch((error) => {
      next(error);
    });
}

module.exports = {
  verifyToken,
  isAdmin,
};
