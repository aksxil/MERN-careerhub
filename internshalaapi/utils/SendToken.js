// utils/sendtoken.js


exports.sendtoken = (student, statusCode, res) => {
  const token = student.getjwttoken();

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000), // 7 days
    httpOnly: true,
    secure: true,          // REQUIRED for HTTPS (Render/Vercel)
    sameSite: "none",      // REQUIRED for cross-origin cookies
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      id: student._id,
      token, // optional, frontend may ignore
    });
};


exports.sendtokenemploy = (employe, statusCode, res) => {
  const token = employe.getjwttoken();

  const options = {
    expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    httpOnly: true,
    secure: true,
    sameSite: "none",
  };

  res
    .status(statusCode)
    .cookie("token", token, options)
    .json({
      success: true,
      id: employe._id,
      token,
    });
};
