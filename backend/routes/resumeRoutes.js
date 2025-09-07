import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import { createResume, getUserResumes, deleteResume, getResumeById, updateResume } from '../controllers/resumeController.js';
import { uploadResumeImages } from '../controllers/uploadImage.js';
const resumeRouter = express.Router();
resumeRouter.post('/', protect, createResume)
resumeRouter.get('/', protect, getUserResumes)
resumeRouter.get('/:id/getResumeById', protect, getResumeById)
resumeRouter.post('/:id/update', protect, updateResume)
resumeRouter.post('/:id/upload-images ', protect, uploadResumeImages)
resumeRouter.delete('/:id/delete', protect, deleteResume) 
export default resumeRouter;