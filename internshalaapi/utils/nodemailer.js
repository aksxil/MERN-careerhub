const nodemailer = require("nodemailer");
const ErrorHandler = require("../utils/ErrorHandler");

exports.sendmail = (req, res, next, url) => {
    const transport = nodemailer.createTransport({
        service: "gmail",
        host: "smtp.gmail.com",
        port: 465,
        auth: {
            user: process.env.MAIL_EMAIL_ADDRESS,
            pass: process.env.MAIL_EMAIL_PASSWORD
        }
    });

    const mailOptions = {
        from: "Master Pvt Ltd.",
        to: req.body.email,
        subject: "Password Reset Link",
        html: `<!DOCTYPE html>
        <html lang="en">
        <head>
          <meta charset="UTF-8">
          <meta name="viewport" content="width=device-width, initial-scale=1.0">
          <title>Password Reset</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              line-height: 1.6;
              background-color: #f4f4f4;
              margin: 0;
              padding: 0;
            }
            .container {
              max-width: 600px;
              margin: 20px auto;
              padding: 20px;
              background-color: #fff;
              border-radius: 8px;
              box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
            }
            h1 {
              color: #333;
            }
            p {
              color: #666;
            }
            .btn {
              display: inline-block;
              padding: 10px 20px;
              background-color: #007bff;
              color: #fff;
              text-decoration: none;
              border-radius: 5px;
            }
            .btn:hover {
              background-color: #0056b3;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <h1>Password Reset</h1>
            <p>You have requested to reset your password. Click the button below to reset it:</p>
            <a href="${url}" class="btn">Reset Password</a>
            <p>If you did not request this, please ignore this email.</p>
          </div>
        </body>
        </html>
        `
    };

    transport.sendMail(mailOptions, (err, info) => {
        if (err) return next(new ErrorHandler(err, 500));
        console.log(info);
        return res.status(200).json({
            message: "Mail sent successfully",
            url
        });
    });
};
