import fs from 'fs';
import path from 'path';
import upload from '../middleware/uploadMiddleware.js';
import Resume from '../models/resumeModel.js';
import { rspHandler } from '../utils/utils.js';
export const uploadResumeImages = async (req, res) => { 
  try {
    upload.fields([{name:'thumbnail'},{name:'profileImage'}])
    (req, res, async (err) => {
      if (err) {
        return rspHandler(res, null, 400, "Error uploading files");
      }
      const resumeId = req.params.resumeId;
      const resume = await Resume.findOne({ _id: resumeId,userId:req.user._id });
      if (!resume) {
        return rspHandler(res, null, 404, "Resume not found");
      }
      const uploadsFolder = path.join(process.cwd(), 'uploads');
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      
      const newThumbnail = req.files.thumbnail?.[0]
      const newProfileImage = req.files.profileImage?.[0];

      if(newThumbnail){
        if(resume.thumbnailLink){
          const oldThumbnail = path.join(uploadsFolder, path.basename(resume.thumbnailLink));
          if (fs.existsSync(oldThumbnail)) {
            fs.unlinkSync(oldThumbnail);
          }
        }
        resume.thumbnailLink = `${baseUrl}/uploads/${newThumbnail.filename}`;
      }

      if(newProfileImage){
        if(resume.profileInfo?.profilePreviewUrl){
          const oldProfile = path.join(uploadsFolder, path.basename(resume.profileInfo.profilePreviewUrl));
          if (fs.existsSync(oldProfile)) {
            fs.unlinkSync(oldProfile);
          }
        }
        resume.profileInfo.profilePreviewUrl = `${baseUrl}/uploads/${newProfileImage.filename}`;
      }

      await resume.save();
      rspHandler(res, { 
        thumbnailLink: resume.thumbnailLink, 
        profilePreviewUrl: resume.profileInfo.profilePreviewUrl 
      }, 200, "Images uploaded successfully");
    });
  } catch (error) {
    return rspHandler(res, null, 500, "Internal Server Error");
  }
};