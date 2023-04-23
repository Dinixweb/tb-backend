import * as crypto from "crypto";
import otpGenerator from "otp-generator";
function generateToken() {
  return crypto.randomBytes(20).toString("hex");
}

function otpTimer() {
  const dFormat = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const time = 15;
  const now = new Date();
  const timer = new Date(now.getTime() + time * 60000);
  return dFormat.format(timer);
}

function generatedOTP() {
  return otpGenerator.generate(6, {
    specialChars: false,
    digits: true,
  });
}

function referralCode() {
  return otpGenerator.generate(8, {
    specialChars: false,
    digits: true,
    upperCaseAlphabets: true,
  });
}

function otpCompareTimer() {
  const dFormat = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const now = new Date();
  return dFormat.format(now);
}
function PaymentReferrence() {
  const chars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let code = "";
  for (let i = 0; i < 8; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    code += chars.charAt(randomIndex);
  }
  return code;
}

export {
  otpCompareTimer,
  otpTimer,
  generateToken,
  generatedOTP,
  referralCode,
  PaymentReferrence,
};
