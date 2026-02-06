require("dotenv").config({ path: "./.env" });

const express = require("express");
const app = express();
const mongoose = require("mongoose");

// ------------------- CORS -------------------
const cors = require("cors");

app.use(
  cors({
    origin: [
      "https://careerhub-frontend-amber.vercel.app",
      "http://localhost:5173"
    ],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  })
);

// Handle preflight requests
app.options("*", cors());

// ------------------- DISABLE CACHE (VERY IMPORTANT) -------------------
app.use((req, res, next) => {
  res.setHeader("Cache-Control", "no-store");
  next();
});

// ------------------- DATABASE -------------------
require("./models/database").connectDatabase();

// ------------------- LOGGER -------------------
const logger = require("morgan");
app.use(logger("tiny"));

// ------------------- BODY PARSER -------------------
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// ------------------- SESSION & COOKIES -------------------
const session = require("express-session");
const cookieParser = require("cookie-parser");

app.use(cookieParser());

app.use(
  session({
    name: "careerhub.sid",
    secret: process.env.EXPRESS_SESSION_SECRET || "session_secret",
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      secure: true,          // ✅ REQUIRED on Render/Vercel
      sameSite: "none",      // ✅ REQUIRED for cross-site cookies
      maxAge: 24 * 60 * 60 * 1000,
    },
  })
);

// ------------------- FILE UPLOAD -------------------
const fileUpload = require("express-fileupload");

app.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/",
  })
);

// ------------------- ROUTES -------------------
app.use("/", require("./routes/indexRoutes"));
app.use("/resume", require("./routes/resumeRoutes"));
app.use("/employe", require("./routes/employeRoutes"));

// ------------------- ERROR HANDLING -------------------
const ErrorHandler = require("./utils/ErrorHandler");
const { generatedErrors } = require("./middlewares/errors");

app.all("*", (req, res, next) => {
  next(new ErrorHandler(`URL not found: ${req.originalUrl}`, 404));
});

app.use(generatedErrors);

// ------------------- SERVER -------------------
const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
