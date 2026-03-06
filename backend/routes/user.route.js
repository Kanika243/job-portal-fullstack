import express from "express";
import { body } from "express-validator";
import { login, logout, register, updateProfile } from "../controllers/user.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { singleUpload } from "../middlewares/mutler.js";
 
const router = express.Router();

router.route("/register").post(
    singleUpload,
    [
        body('fullname').notEmpty().withMessage('Full name is required'),
        body('email').isEmail().withMessage('Valid email required'),
        body('phoneNumber').notEmpty().withMessage('Phone number required'),
        body('password').isLength({ min: 6 }).withMessage('Password at least 6 chars'),
        body('role').isIn(['user','admin','company']).withMessage('Invalid role')
    ],
    register
);
router.route("/login").post(
    [
        body('email').isEmail(),
        body('password').notEmpty(),
        body('role').notEmpty()
    ],
    login
);
router.route("/logout").get(logout);
router.route("/profile/update").post(isAuthenticated,singleUpload,updateProfile);

export default router;

