const express = require("express");
const {
  hasRole,
  isAdmin,
  verifyToken,
} = require("../../middleware/authentication");
const { Roles } = require("../../utilities/role.utility");
const router = express.Router();
const userController = require("./user.controller");

/**
 *  @swagger
 *  /user:
 *    get:
 *      summary: Login endpoint
 *      description:
 *      responses:
 *          description: A string
 *          content: application/json
 */
router.post("/login", userController.login);
router.post("/register", userController.register);
router.post(
  "/changeRole",
  [verifyToken, hasRole(Roles.Admin)],
  userController.changeRole
);

module.exports = router;
