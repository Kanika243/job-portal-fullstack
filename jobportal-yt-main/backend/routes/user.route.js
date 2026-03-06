import express from "express";
import { login, logout, register, updateProfile, getCurrentUser } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(singleUpload,register);
router.route("/login").post(login);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);
// fetch currently logged-in user
router.route("/me").get(isAuthenticated, getCurrentUser);

export default router;

