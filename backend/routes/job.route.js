import express from "express";
import { body } from "express-validator";
import isAuthenticated from "../middlewares/isAuthenticated.js";
import { getAdminJobs, getAllJobs, getJobById, postJob } from "../controllers/job.controller.js";

const router = express.Router();

router.route("/post").post(
    isAuthenticated,
    [
        body('title').notEmpty(),
        body('description').notEmpty(),
        body('salary').isNumeric(),
        body('experienceLevel').isNumeric(),
        body('location').notEmpty(),
        body('jobType').notEmpty(),
        body('position').isNumeric()
    ],
    postJob
);
router.route("/get").get(isAuthenticated, getAllJobs);
router.route("/getadminjobs").get(isAuthenticated, getAdminJobs);
router.route("/get/:id").get(isAuthenticated, getJobById);

export default router;

