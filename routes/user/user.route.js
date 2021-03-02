const express = require("express");
const { hasRole, isAdmin, verifyToken } = require("../../middleware/authentication");
const {Roles} = require("../../utilities/role.utility")
const router = express.Router();
const userController = require("./user.controller");

/**
 * @swagger
 * /user/register:
 *   post:
 *     summary: Register user
 *     description: Register a new user at Johns Hotel og Soen
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Name of user
 *                 example: John Dillermand
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password
 *                 example: pw1234
 *               role:
 *                 type: string
 *                 enum: ["admin", "user", "guest", "manager"]
 *                 description: Role of user
 *                 example: admin
 *             required:
 *               - username
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Newly registered user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Name of user
 *                   example: John Dillermand
 *                 role:
 *                   type: string
 *                   description: Role of user
 *                   example: admin
 * 
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Request
 *       403:
 *         description: Forbidden Request
 * 
 * /user/login:
 *   post:
 *     summary: Login
 *     description: Log in to Johns Hotel og Soen
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Name of user
 *                 example: John Dillermand
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password
 *                 example: pw1234
 *             required:
 *               - username
 *               - password
 *     responses:
 *       201:
 *         description: Successfully logged in
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Name of user
 *                   example: John Dillermand
 *                 role:
 *                   type: string
 *                   description: Role of user
 *                   example: admin
 * 
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Request
 *       403:
 *         description: Forbidden Request
 * 
 * /user/changeRole:
 *   post:
 *     summary: Change role
 *     description: Change role of user at Johns Hotel og Soen
 *     requestBody:
 *       description: Request body
 *       required: true
 *       content:
 *         application/json:
 *           schema: 
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: Name of user
 *                 example: John Dillermand
 *               password:
 *                 type: string
 *                 format: password
 *                 description: User password
 *                 example: pw1234
 *               role:
 *                 type: string
 *                 enum: ["admin", "user", "guest", "manager"]
 *                 description: Role of user
 *                 example: admin
 *             required:
 *               - username
 *               - password
 *               - role
 *     responses:
 *       201:
 *         description: Successfully changed role of user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 username:
 *                   type: string
 *                   description: Name of user
 *                   example: John Dillermand
 *                 role:
 *                   type: string
 *                   description: Role of user
 *                   example: admin
 * 
 *       400:
 *         description: Bad Request
 *       401:
 *         description: Unauthorized Request
 *       403:
 *         description: Forbidden Request
 */
router.post("/register", userController.register);
router.post("/login", userController.login);
router.post("/changeRole", [verifyToken, hasRole(Roles.Admin)], userController.changeRole);

module.exports = router;
