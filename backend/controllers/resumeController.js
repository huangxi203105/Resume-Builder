import Resume from '../models/resumeModel.js';
import { rspHandler } from '../utils/utils.js';
import fs from 'fs';
import path from 'path';
export const createResume = async (req, res) => {
  try{
    const { title, content } = req.body;

    const defaultResumeData = {
      profileInfo: {
        profileImg: null,
        previewUrl: '',
        fullName: '',
        designation: '',
        summary: '',
      },
      contactInfo: {
        email: '',
        phone: '',
        location: '',
        linkedin: '',
        github: '',
        website: '',
      },
      workExperience: [
        {
          company: '',
          role: '',
          startDate: '',
          endDate: '',
          description: '',
        },
      ],
      education: [
        {
          degree: '',
          institution: '',
          startDate: '',
          endDate: '',
        },
      ],
      skills: [
        {
          name: '',
          progress: 0,
        },
      ],
      projects: [
        {
          title: '',
          description: '',
          github: '',
          liveDemo: '',
        },
      ],
      certifications: [
        {
          title: '',
          issuer: '',
          year: '',
        },
      ],
      languages: [
        {
          name: '',
          progress: '',
        },
      ],
      interests: [''],
    };
    console.log(req.user)
    const newResume = await Resume.create({
      userId: req.user._id,
      title: title || "My Resume",
      ...defaultResumeData,
      ...req.body,
    });
    rspHandler(res, newResume, 201, "Resume created successfully");
  }catch (error) {
    console.error("Error creating resume:", error);
    rspHandler(res, null, 500, "简历创建失败");
  }
}
export const getUserResumes = async (req, res) => {
  try {
    const resumes = await Resume.find({ userId: req.user._id }).sort({ updatedAt: -1 });
    rspHandler(res, resumes, 200, "Resumes retrieved successfully");
  } catch (error) {
    console.error("Error retrieving resumes:", error);
    rspHandler(res, null, 500, "简历获取失败");
  }
}

export const getResumeById = async (req, res) => {
  try {
    const resume = await Resume.findOne({ _id: req.params.id, userId: req.user._id });
    if (!resume) {
      rspHandler(res, null, 404, "Resume not found");
      return;
    }
    rspHandler(res, resume, 200, "Resume retrieved successfully");
  } catch (error) {
    console.error("Error retrieving resume:", error);
    rspHandler(res, null, 500, "简历获取失败");
  }
}

export const updateResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
    if(!resume){
      return rspHandler(res, null, 404, "Resume not found");
    }
    Object.assign(resume, req.body);
    const updatedResume = await resume.save();
    respHandler(res, updatedResume, 200, "Resume updated successfully");
  } catch (error) {
    console.error("Error updating resume:", error);
    rspHandler(res, null, 500, "简历更新失败");
  }
}

export const deleteResume = async (req, res) => {
  try {
    const resume = await Resume.findOne({
      _id: req.params.id,
      userId: req.user._id,
    })
    if(!resume){
      return rspHandler(res, null, 404, "Resume not found");
    }
    const uploadsFolder = path.join(process.cwd(), 'uploads');
    
    if(resume.thumbnailLink){
      const oldThumbnailPath = path.join(uploadsFolder,  path.basename(resume.thumbnailLink));
      if (fs.existsSync(oldThumbnailPath)) {
        fs.unlinkSync(oldThumbnailPath);
      }
    }
    
    if(resume.profileInfo.profilePreviewUrl){
      const oldProfilePreviewPath = path.join(uploadsFolder,  path.basename(resume.profileInfo.profilePreviewUrl));
      if (fs.existsSync(oldProfilePreviewPath)) {
        fs.unlinkSync(oldProfilePreviewPath);
      }
    }
    const deletedResume = await Resume.deleteOne({
      _id: req.params.id,
      userId: req.user._id,
    });
    if(!deletedResume){
      return rspHandler(res, null, 404, "Resume not found"); 
    }
    
    rspHandler(res,null, 200, "Resume deleted successfully");
  } catch (error) {
    console.error("Error deleting resume:", error);
    rspHandler(res, null, 500, "简历删除失败");
  }
} 