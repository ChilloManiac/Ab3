const User = require("../../models/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const { HttpError } = require("../../middleware/errorHandler");
const { isRoleValid } = require("../../utilities/role.utility");


async function register(username, role, password) {
  if (!isRoleValid(role)) {
    throw new HttpError(400, "Invalid role.");
  }
  const salt = await bcrypt.genSalt(10);
  const hash = await bcrypt.hash(password, salt);
  const user = new User({
    username: username,
    role: role,
    password: hash,
  });
  try {
    const newUser = await user.save();
    return {
      username: newUser.username,
      role: newUser.role,
    };
  } catch (error) {
    throw new HttpError(400, "Username already taken.");
  }
}

async function login(username, password) {
  const user = await User.findOne({ username: username });
  if (!user) {
    throw new HttpError(400, "Username or password is wrong.");
  }
  const validPassword = await bcrypt.compare(password, user.password);
  if (!validPassword) {
    throw new HttpError(400, "Username or password is wrong.");
  }
  return {
    token: jwt.sign({ _id: user._id }, process.env.TOKEN_SECRET),
  };
}

async function changeRole(username, role) {
  if (!isRoleValid(role)) {
    throw new HttpError(400, "Invalid role.");
  }
  const user = await User.findOneAndUpdate(
    { username: username },
    { role: role }
  );
  if (!user) {
    throw new HttpError(400, "No user with that username exists.");
  }
  return {
    username: username,
    role: role,
  };
}

module.exports = {
  login,
  register,
  changeRole,
};
