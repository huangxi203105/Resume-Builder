import COS from 'cos-nodejs-sdk-v5';
import 'dotenv/config.js';

// 腾讯云 COS 配置
const cosConfig = {
  SecretId: process.env.TENCENT_SECRET_ID,
  SecretKey: process.env.TENCENT_SECRET_KEY,
  Region: process.env.TENCENT_COS_REGION || 'ap-beijing',
  Bucket: process.env.TENCENT_COS_BUCKET,
};

// 验证配置
const validateConfig = () => {
  const requiredFields = ['SecretId', 'SecretKey', 'Bucket'];
  const missingFields = requiredFields.filter(field => !cosConfig[field]);
  
  if (missingFields.length > 0) {
    console.error('❌ COS 配置缺失:', missingFields.join(', '));
    console.error('请在 .env 文件中配置以下环境变量:');
    console.error('TENCENT_SECRET_ID=你的SecretId');
    console.error('TENCENT_SECRET_KEY=你的SecretKey');
    console.error('TENCENT_COS_REGION=ap-beijing');
    console.error('TENCENT_COS_BUCKET=你的存储桶名称');
    return false;
  }
  return true;
};

// 创建 COS 实例
let cosInstance = null;

if (validateConfig()) {
  cosInstance = new COS({
    SecretId: cosConfig.SecretId,
    SecretKey: cosConfig.SecretKey,
  });
  console.log('✅ 腾讯云 COS 初始化成功');
} else {
  console.warn('⚠️  腾讯云 COS 未配置，将使用本地存储');
}

// 生成唯一文件名
export const generateFileName = (originalName) => {
  const timestamp = Date.now();
  const random = Math.random().toString(36).substring(2, 8);
  const ext = originalName.split('.').pop();
  return `profiles/${timestamp}-${random}.${ext}`;
};

// 上传文件到 COS
export const uploadToCOS = (fileBuffer, fileName, mimeType) => {
  return new Promise((resolve, reject) => {
    if (!cosInstance) {
      reject(new Error('COS 未正确配置'));
      return;
    }

    cosInstance.putObject({
      Bucket: cosConfig.Bucket,
      Region: cosConfig.Region,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimeType,
    }, (err, data) => {
      if (err) {
        console.error('COS 上传失败:', err);
        reject(err);
      } else {
        // 构建访问 URL
        const url = `https://${cosConfig.Bucket}.cos.${cosConfig.Region}.myqcloud.com/${fileName}`;
        resolve({
          url,
          location: data.Location,
          key: fileName
        });
      }
    });
  });
};

// 删除 COS 文件
export const deleteFromCOS = (fileName) => {
  return new Promise((resolve, reject) => {
    if (!cosInstance) {
      reject(new Error('COS 未正确配置'));
      return;
    }

    cosInstance.deleteObject({
      Bucket: cosConfig.Bucket,
      Region: cosConfig.Region,
      Key: fileName,
    }, (err, data) => {
      if (err) {
        console.error('COS 删除失败:', err);
        reject(err);
      } else {
        resolve(data);
      }
    });
  });
};

// 检查 COS 是否可用
export const isCOSAvailable = () => {
  return cosInstance !== null;
};

export { cosConfig };
export default cosInstance;
