import User from '../models/userModel.js';
import jwt from 'jsonwebtoken';
import { rspHandler } from '../utils/utils.js';
export const protect = async (req, res, next) => {
  try {
    let token = req.headers.authorization
    console.log('Token:', token);
    if (!token || !token.startsWith('Bearer ')) {
      return rspHandler(res, 401, 'Unauthorized');
    }
    token = token.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log('Decoded Token:', decoded);
    req.user = await User.findById(decoded.id).select('-password');
    console.log('User:', req.user);
    next();
  } catch (error) {
    return rspHandler(res, 401, 'Unauthorized');
  }
}