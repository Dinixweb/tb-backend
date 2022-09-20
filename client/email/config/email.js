const nodemailer = require("nodemailer");
const fs = require("fs-extra");
const dotenv = require("dotenv");
var ejs = require("ejs");

dotenv.config();
const { EMAIL } = process.env;
const { EMAILPASSWORD } = process.env;
const transporter = nodemailer.createTransport({
  host: "smtp-mail.outlook.com",
  port: 587,
  secure: false,
  auth: {
    user: EMAIL,
    pass: EMAILPASSWORD,
  },
});

exports.oneTimePassword = (firstName, email, otp) => {
  const mail = {
    from: emailId,
    to: email,
    subject: "one-time-password",
    text: optTemplate(firstName, otp),
  };
  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
};

const optTemplate = (firstName, otp) => {
  return (
    `Dear ${firstName}, \n\n` +
    "OTP for continue signup is : \n\n" +
    `${otp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "EMS Support Team \n\n"
  );
};

exports.SignUp = (firstName, email, benefitList, referalCode) => {
  fs.readFile("./template/signup.ejs", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    const mainOptions = {
      from: emailId,
      to: email,
      subject: "Sign Confirmation",
      html: ejs.render(data, {
        email: email,
        firstName: firstName,
        benefitList: benefitList,
        referalCode: referalCode,
      }),
    };
    transporter.sendMail(mainOptions, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
};
