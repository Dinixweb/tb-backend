import nodemailer from "nodemailer";
import fs from "fs-extra";
import dotenv from "dotenv";
import ejs from "ejs";

dotenv.config();
const EMAIL = process.env.EMAIL as string;
const EMAILPASSWORD = process.env.PASSWORD as string;
const transporter = nodemailer.createTransport({
  host: "",
  port: ,
  secure: false,
  auth: {
    user: "",
    pass: "",
  },
});

export function passwordResetEmail(firstName, email, otp) {
  const mail = {
    from: "",
    to: email,
    subject: "one-time-password",
    text: passwordReset(firstName, otp),
  };
  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}
export function changeEmail(firstName, email, otp) {
  const mail = {
    from: "",
    to: email,
    subject: "Email Reset OTP",
    text: changeEmailMessage(firstName, otp),
  };
  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}
export function changePhone(firstName, email, otp) {
  const mail = {
    from: "",
    to: email,
    subject: "Email Reset OTP",
    text: changePhoneMessage(firstName, otp),
  };
  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}
export function EmailChangeSuccess(firstName, email) {
  const mail = {
    from: "",
    to: email,
    subject: "Email Reset OTP",
    text: emailSuccessMessage(firstName),
  };
  transporter.sendMail(mail, (err, info) => {
    if (err) {
      console.log(err);
      return;
    }
  });
}

const changeEmailMessage = (firstName, otp) => {
  return (
    `Dear ${firstName}, \n\n` +
    "Kindly use this otp to change your email : \n\n" +
    `${otp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "Travel Buddy Support Team \n\n"
  );
};
const changePhoneMessage = (firstName, otp) => {
  return (
    `Dear ${firstName}, \n\n` +
    "Kindly use this otp to change your phone number : \n\n" +
    `${otp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "Travel Buddy Support Team \n\n"
  );
};
const emailSuccessMessage = (firstName) => {
  return (
    `Dear ${firstName}, \n\n` +
    "Your email has been changed successfully : \n\n" +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "Travel Buddy Support Team \n\n"
  );
};
const passwordReset = (firstName, otp) => {
  return (
    `Dear ${firstName}, \n\n` +
    "Kindly use this link to reset your password : \n\n" +
    `https:www.wekanfly.com/${otp}\n\n` +
    "This is a auto-generated email. Please do not reply to this email.\n\n" +
    "Regards\n" +
    "Travel Buddy Support Team \n\n"
  );
};

export function SignUp(firstName, email, benefitList, referalCodeLink) {
  fs.readFile("./template/signup.ejs", "utf8", function (err, data) {
    if (err) {
      return console.log(err);
    }
    const mainOptions = {
      from: "",
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
