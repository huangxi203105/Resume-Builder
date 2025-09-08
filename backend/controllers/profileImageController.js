import { rspHandler } from '../utils/utils.js';
import { uploadProfileImage, handleCOSUpload } from '../middleware/cosUploadMiddleware.js';
import { deleteFromCOS, isCOSAvailable } from '../config/cos.js';
import fs from 'fs';
import path from 'path';

// 上传证件照
export const uploadProfilePhoto = async (req, res) => {
  // 使用 multer 中间件处理文件上传
  uploadProfileImage(req, res, async (err) => {
    if (err) {
      console.error('文件上传错误:', err.message);
      return rspHandler(res, null, 400, err.message);
    }

    // 检查是否有文件上传
    if (!req.file) {
      return rspHandler(res, null, 400, "请选择要上传的图片文件");
    }

    try {
      // 处理 COS 或本地上传
      await handleCOSUpload(req, res, () => {});

      let imageUrl = '';
      let uploadInfo = {};

      // 根据上传方式返回不同的 URL
      if (req.cosUpload) {
        // COS 上传成功
        imageUrl = req.cosUpload.url;
        uploadInfo = {
          type: 'cos',
          url: req.cosUpload.url,
          key: req.cosUpload.key,
          location: req.cosUpload.location
        };
      } else if (req.localUpload) {
        // 本地上传成功
        imageUrl = req.localUpload.url;
        uploadInfo = {
          type: 'local',
          url: req.localUpload.url,
          filename: req.localUpload.filename,
          path: req.localUpload.path
        };
      } else {
        throw new Error('文件上传处理失败');
      }

      // 返回成功响应
      rspHandler(res, {
        imageUrl,
        uploadInfo,
        message: '证件照上传成功'
      }, 200, "证件照上传成功");

    } catch (error) {
      console.error('证件照上传失败:', error);
      rspHandler(res, null, 500, "证件照上传失败: " + error.message);
    }
  });
};

// 删除证件照
export const deleteProfilePhoto = async (req, res) => {
  try {
    const { imageUrl, type, key, filename } = req.body;

    if (!imageUrl) {
      return rspHandler(res, null, 400, "请提供要删除的图片URL");
    }

    let deleteSuccess = false;

    if (type === 'cos' && key) {
      // 删除 COS 文件
      if (isCOSAvailable()) {
        try {
          await deleteFromCOS(key);
          deleteSuccess = true;
          console.log('✅ COS 文件删除成功:', key);
        } catch (error) {
          console.error('❌ COS 文件删除失败:', error);
          throw error;
        }
      }
    } else if (type === 'local' && filename) {
      // 删除本地文件
      const filePath = path.join(process.cwd(), 'uploads', 'profiles', filename);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
        deleteSuccess = true;
        console.log('📁 本地文件删除成功:', filePath);
      }
    } else {
      // 尝试从 URL 推断删除方式
      if (imageUrl.includes('myqcloud.com')) {
        // 看起来是 COS URL，尝试提取 key
        const urlParts = imageUrl.split('/');
        const extractedKey = urlParts.slice(-2).join('/'); // 获取 profiles/filename 部分
        
        if (isCOSAvailable()) {
          await deleteFromCOS(extractedKey);
          deleteSuccess = true;
        }
      } else {
        // 看起来是本地 URL，尝试删除本地文件
        const urlParts = imageUrl.split('/');
        const extractedFilename = urlParts[urlParts.length - 1];
        const filePath = path.join(process.cwd(), 'uploads', 'profiles', extractedFilename);
        
        if (fs.existsSync(filePath)) {
          fs.unlinkSync(filePath);
          deleteSuccess = true;
        }
      }
    }

    if (deleteSuccess) {
      rspHandler(res, { deleted: true }, 200, "证件照删除成功");
    } else {
      rspHandler(res, null, 404, "文件不存在或删除失败");
    }

  } catch (error) {
    console.error('证件照删除失败:', error);
    rspHandler(res, null, 500, "证件照删除失败: " + error.message);
  }
};

// 获取上传配置信息
export const getUploadConfig = async (req, res) => {
  try {
    const config = {
      cosAvailable: isCOSAvailable(),
      maxFileSize: '5MB',
      allowedTypes: ['image/png', 'image/jpeg', 'image/jpg', 'image/webp'],
      uploadPath: isCOSAvailable() ? 'COS云存储' : '本地存储'
    };

    rspHandler(res, config, 200, "上传配置获取成功");
  } catch (error) {
    console.error('获取上传配置失败:', error);
    rspHandler(res, null, 500, "获取上传配置失败");
  }
};
