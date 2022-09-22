import jwt from 'jsonwebtoken';
import  jwtSecret  from  '../../config/keys';

export default async function userAuth (req, res, next) {
  try {
    const token = req.headers['tb-access-token'];
    const decoded = jwt.verify(token, jwtSecret.jwtSecret);
    req.user = decoded;
    next();
  } catch (err) {
    return res
      .status(401)
      .send({ success: false, message: 'Authentication Failed!' });
  }
}