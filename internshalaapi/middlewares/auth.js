// middlewares/auth.js

const jwt = require("jsonwebtoken");
const ErrorHandler = require("../utils/ErrorHandler");
const { catchAsyncError } = require("./catchAsyncError");

exports.isAuthenticated = catchAsyncError(async (req, res, next) => {
  const token = req.cookies?.token;

  if (!token) {
    return next(
      new ErrorHandler("Please log in to access the resource", 401)
    );
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.id = decoded.id;
    next();
  } catch (error) {
    return next(
      new ErrorHandler("Invalid or expired token", 401)
    );
  }
});
