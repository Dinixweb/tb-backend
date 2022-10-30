export function generateToken() {
  return crypto.randomUUID().toString();
}

export function otpTimer() {
  const dFormat = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const time = 15;
  const now = new Date();
  const timer = new Date(now.getTime() + time * 60000);
  const finalT = dFormat.format(timer);
  return finalT;
}

export function otpCompareTimer() {
  const dFormat = new Intl.DateTimeFormat("default", {
    hour: "numeric",
    minute: "numeric",
    hour12: false,
  });
  const now = new Date();
  const currentTime = dFormat.format(now);
  return currentTime;
}
