import express from "express";
import { body } from "express-validator";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getCompany, getCompanyById, registerCompany, updateCompany } from "../controllers/company.controller.js";
import { singleUpload } from "../middlewares/mutler.js";

const router = express.Router();

router.route("/register").post(
    isAuthenticated,
    [body('companyName').notEmpty().withMessage('Company name is required')],
    registerCompany
);
router.route("/get").get(isAuthenticated,getCompany);
router.route("/get/:id").get(isAuthenticated,getCompanyById);
router.route("/update/:id").put(
    isAuthenticated,
    singleUpload,
    [
        body('name').optional().notEmpty(),
        body('description').optional().isString(),
        body('website').optional().isURL(),
        body('location').optional().isString()
    ],
    updateCompany
);

export default router;

