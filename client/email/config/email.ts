import  nodemailer from "nodemailer";
import  fs from "fs-extra";
import  dotenv from "dotenv";
import  ejs from "ejs";

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

export function oneTimePassword (firstName, email, otp) {
  const mail = {
    from: EMAIL,
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
}

const optTemplate = (firstName, otp) => {
  return (
    `Dear ${firstName}, \n\n` +
    "OTP for continue signup is : \n\n" +
    `${otp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "Travel Buddy Support Team \n\n"
  );
};

export function SignUp (firstName, email, benefitList, referalCodeLink){
  fs.readFile("./template/signup.ejs", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    const mainOptions = {
      from: EMAIL,
      to: email,
      subject: "Sign Confirmation",
      html: ejs.render(data, {
        email: email,
        firstName: firstName,
        benefitList: benefitList,
        referalCode: referalCodeLink,
      }),
    };
    transporter.sendMail(mainOptions, (err, info) => {
      if (err) {
        console.log(err);
        return;
      }
    });
  });
}
