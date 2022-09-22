"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SignUp = exports.oneTimePassword = void 0;
const nodemailer_1 = __importDefault(require("nodemailer"));
const fs_extra_1 = __importDefault(require("fs-extra"));
const dotenv_1 = __importDefault(require("dotenv"));
const ejs_1 = __importDefault(require("ejs"));
dotenv_1.default.config();
const { EMAIL } = process.env;
const { EMAILPASSWORD } = process.env;
const transporter = nodemailer_1.default.createTransport({
    host: "smtp-mail.outlook.com",
    port: 587,
    secure: false,
    auth: {
        user: EMAIL,
        pass: EMAILPASSWORD,
    },
});
function oneTimePassword(firstName, email, otp) {
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
exports.oneTimePassword = oneTimePassword;
const optTemplate = (firstName, otp) => {
    return (`Dear ${firstName}, \n\n` +
        "OTP for continue signup is : \n\n" +
        `${otp}\n\n` +
        "This is a auto-generated email. Please do not reply to this email.\n\n" +
        "Regards\n" +
        "Travel Buddy Support Team \n\n");
};
function SignUp(firstName, email, benefitList, referalCodeLink) {
    fs_extra_1.default.readFile("./template/signup.ejs", "utf8", function (err, data) {
        if (err) {
            return console.log(err);
        }
        const mainOptions = {
            from: EMAIL,
            to: email,
            subject: "Sign Confirmation",
            html: ejs_1.default.render(data, {
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
exports.SignUp = SignUp;
//# sourceMappingURL=email.js.map