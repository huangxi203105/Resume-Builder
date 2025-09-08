import express from 'express';
import { rspHandler } from '../utils/utils.js';
import { registerUser, loginUser, getUserProfile } from '../controllers/userController.js';
import { protect } from '../middleware/authMiddleware.js';
import { uploadProfilePhoto, deleteProfilePhoto, getUploadConfig } from '../controllers/profileImageController.js';

const userRouter = express.Router();

userRouter.post('/register', registerUser)
userRouter.post('/login', loginUser)

userRouter.get('/profile', protect, getUserProfile)

// 证件照上传相关路由
userRouter.post('/upload-profile-photo', protect, uploadProfilePhoto)
userRouter.post('/delete-profile-photo', protect, deleteProfilePhoto)
userRouter.get('/upload-config', getUploadConfig)

export default userRouter;