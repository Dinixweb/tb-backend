import jwt from "jsonwebtoken";
import jwtSecret from "../../config/keys";

export default async function userAuth(req, res, next) {
  try {
    const token = req.headers["tb-access-token"];
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, jwtSecret.jwtSecret);

    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ success: false, message: "Authentication Failed!" });
  }
}

export async function adminAuth(req, res, next) {
  try {
    const token = req.headers["tb-access-token"];
    const bearerToken = token.split(" ")[1];
    const decoded = jwt.verify(bearerToken, jwtSecret.JWT_ADMIN_SECRET);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ success: false, message: "Authentication Failed!" });
  }
}
