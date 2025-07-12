import express from 'express';
import { rspHandler } from '../utils/utils.js';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';

const userRouter = express.Router();

userRouter.post('/register',registerUser)
userRouter.post('/login',loginUser)

userRouter.get('/profile',protect,getUserProfile)

export default userRouter;