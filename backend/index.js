import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";

import connectDB from "./utils/db.js";

import userRoute from "./routes/user.route.js";
import companyRoute from "./routes/company.route.js";
import jobRoute from "./routes/job.route.js";
import applicationRoute from "./routes/application.route.js";

import errorHandler from "./middlewares/errorHandler.js";

dotenv.config();

const app = express();

// ======================
// DATABASE CONNECTION
// ======================
connectDB();

// ======================
// MIDDLEWARE
// ======================
app.use(express.json());

app.use(express.urlencoded({ extended: true }));

app.use(cookieParser());

// ======================
// CORS CONFIGURATION
// ======================
const corsOptions = {
  origin: process.env.CLIENT_URL || "http://localhost:5173",
  credentials: true,
};

app.use(cors(corsOptions));

// ======================
// PORT
// ======================
const PORT = process.env.PORT || 5000;

// ======================
// TEST ROUTE
// ======================
app.get("/", (req, res) => {
  res.send("API is running successfully...");
});

// ======================
// API ROUTES
// ======================
app.use("/api/v1/user", userRoute);

app.use("/api/v1/company", companyRoute);

app.use("/api/v1/job", jobRoute);

app.use("/api/v1/application", applicationRoute);

// ======================
// ERROR HANDLER
// ======================
app.use(errorHandler);

// ======================
// SERVER LISTEN
// ======================
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});