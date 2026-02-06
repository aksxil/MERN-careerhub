const nodemailer = require("nodemailer");
const ErrorHandler = require("../utils/ErrorHandler");

exports.sendmail = (req, res, next, url) => {
  if (!url) {
    return next(
      new ErrorHandler("Reset password URL is missing", 500)
    );
  }

  const transport = nodemailer.createTransport({
    service: "gmail",
    host: "smtp.gmail.com",
    port: 465,
    secure: true,
    auth: {
      user: process.env.MAIL_EMAIL_ADDRESS,
      pass: process.env.MAIL_EMAIL_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"CareerHub" <${process.env.MAIL_EMAIL_ADDRESS}>`,
    to: req.body.email,
    subject: "Reset your password",
    html: `
      <div style="font-family: Arial, sans-serif; padding:20px;">
        <h2>Password Reset</h2>
        <p>You requested a password reset.</p>
        <a 
          href="${url}"
          style="
            display:inline-block;
            padding:10px 20px;
            background:#4f46e5;
            color:#fff;
            text-decoration:none;
            border-radius:6px;
          "
        >
          Reset Password
        </a>
        <p style="margin-top:20px;">
          If you did not request this, please ignore this email.
        </p>
      </div>
    `,
  };

  transport.sendMail(mailOptions, (err, info) => {
    if (err) {
      return next(new ErrorHandler(err.message, 500));
    }

    return res.status(200).json({
      success: true,
      message: "Reset password mail sent successfully",
    });
  });
};
