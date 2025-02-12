import { Router } from "express";
const router = Router();
import * as userController from "../controllers/users.controller.js";
import validateData from "../middlewares/valid.middleware.js";
import authMiddleware from "../middlewares/auth.middleware.js";

router.route("/signup").post(validateData, userController.signup);
router.route("/login").post(userController.login);
router.route("/logout").post(authMiddleware,userController.logout);

export default router;
