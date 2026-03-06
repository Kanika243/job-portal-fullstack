import express from "express";
import { body } from "express-validator";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { applyJob, getApplicants, getAppliedJobs, updateStatus } from "../controllers/application.controller.js";
 
const router = express.Router();

router.route("/apply/:id").get(isAuthenticated, applyJob);
router.route("/get").get(isAuthenticated, getAppliedJobs);
router.route("/:id/applicants").get(isAuthenticated, getApplicants);
router.route("/status/:id/update").post(
    isAuthenticated,
    [body('status').notEmpty().isIn(['pending','accepted','rejected']).withMessage('Invalid status')],
    updateStatus
);
 

export default router;

