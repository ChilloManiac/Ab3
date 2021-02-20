const Roles = {
  Admin: "admin",
  User: "user",
  Guest: "guest",
  Manager: "manager",
};

function isRoleValid(role) {
  return Object.values(Roles).includes(role);
}

module.exports = {
  Roles,
  isRoleValid
};
