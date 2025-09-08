import multer from "multer";
import { uploadToCOS, generateFileName, isCOSAvailable } from '../config/cos.js';
import path from 'path';
import fs from 'fs';

// 内存存储配置（用于 COS 上传）
const memoryStorage = multer.memoryStorage();

// 本地存储配置（备用方案）
const diskStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = "uploads/profiles/";
    // 确保目录存在
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    const fileName = generateFileName(file.originalname);
    cb(null, path.basename(fileName)); // 只取文件名部分
  },
});

// 文件过滤器
const fileFilter = (req, file, cb) => {
  const allowedTypes = ["image/png", "image/jpeg", "image/jpg", "image/webp"];
  if (allowedTypes.includes(file.mimetype)) {
    cb(null, true);
  } else {
    cb(new Error("只支持 PNG、JPEG、JPG、WEBP 格式的图片文件！"), false);
  }
};

// 文件大小限制 (5MB)
const limits = {
  fileSize: 5 * 1024 * 1024, // 5MB
};

// 根据 COS 可用性选择存储方式
const storage = isCOSAvailable() ? memoryStorage : diskStorage;

// 创建 multer 实例
const upload = multer({ 
  storage: storage, 
  fileFilter: fileFilter,
  limits: limits
});

// COS 上传处理中间件
export const handleCOSUpload = async (req, res, next) => {
  try {
    // 如果没有文件，直接跳过
    if (!req.file) {
      return next();
    }

    // 如果 COS 可用，上传到 COS
    if (isCOSAvailable()) {
      const fileName = generateFileName(req.file.originalname);
      
      try {
        const result = await uploadToCOS(
          req.file.buffer, 
          fileName, 
          req.file.mimetype
        );
        
        // 将 COS 信息添加到 req 对象
        req.cosUpload = {
          url: result.url,
          key: result.key,
          location: result.location
        };
        
        console.log('✅ 文件已上传到 COS:', result.url);
      } catch (error) {
        console.error('❌ COS 上传失败，使用本地存储:', error.message);
        // COS 上传失败时的处理逻辑可以在这里添加
        return res.status(500).json({
          success: false,
          message: 'COS 上传失败',
          error: error.message
        });
      }
    } else {
      // 使用本地存储
      const baseUrl = `${req.protocol}://${req.get('host')}`;
      req.localUpload = {
        url: `${baseUrl}/uploads/profiles/${req.file.filename}`,
        filename: req.file.filename,
        path: req.file.path
      };
      
      console.log('📁 文件已保存到本地:', req.localUpload.url);
    }

    next();
  } catch (error) {
    console.error('上传处理失败:', error);
    res.status(500).json({
      success: false,
      message: '文件上传处理失败',
      error: error.message
    });
  }
};

// 导出配置好的上传中间件
export const uploadProfileImage = upload.single('profileImage');

// 多文件上传中间件
export const uploadMultipleImages = upload.fields([
  { name: 'profileImage', maxCount: 1 },
  { name: 'thumbnail', maxCount: 1 }
]);

export default upload;
