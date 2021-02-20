const express = require("express");
const { isAdmin, verifyToken } = require("../../middleware/authentication");
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
router.post("/changeRole", [verifyToken, isAdmin], userController.changeRole);

module.exports = router;
