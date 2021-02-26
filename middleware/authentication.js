const jwt = require("jsonwebtoken");
const {HttpError} = require("./errorHandler");
const User = require("../models/User");
const {Roles} = require("../utilities/role.utility");

function verifyToken(req, res, next) {
    const authHeader = req.header("Authorization");
    const [type, token] = [authHeader.substring(0, 6), authHeader.substring(7)];
    if (type !== 'Bearer' && !token) {
        throw new HttpError(403, "Access denied.");
    }
    try {
        req.verifiedUser = jwt.verify(token, process.env.TOKEN_SECRET);
        next();
    } catch (error) {
        throw new HttpError(403, "Invalid token.");
    }
}

function hasRole(role) {
    return (req, res, next) => {
        const verifiedUser = req.verifiedUser;
        if (!verifiedUser) {
            throw new HttpError(403, "Token not verified.");
        }
        User.findOne({_id: verifiedUser._id})
            .then((user) => {
                if (!user) {
                    throw new HttpError(400, "No user with that username exists.");
                }
                if (user.role !== role) {
                    throw new HttpError(403, "Administrator privileges required.");
                }
                next();
            })
            .catch((error) => {
                next(error);
            });
    }
}


module.exports = {
    verifyToken,
    hasRole,
};
