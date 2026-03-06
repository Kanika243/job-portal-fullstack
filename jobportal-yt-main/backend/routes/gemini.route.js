import express from "express";
import { summarizeJob } from "../controllers/gemini.controller.js";
import isAuthenticated from "../middlewares/isAuthenticated.js"; // Your existing auth middleware

const router = express.Router();

// POST /api/v1/gemini/summarize
// We use the isAuthenticated middleware to protect this route
router.route("/summarize").post(isAuthenticated, summarizeJob);

export default router;