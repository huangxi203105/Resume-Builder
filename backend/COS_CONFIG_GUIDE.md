# 腾讯云 COS 配置指南

## 🚀 快速开始

### 1. 注册腾讯云账号
- 访问：https://cloud.tencent.com/
- 注册账号并完成实名认证
- 建议开通学生优惠（如果符合条件）

### 2. 开通 COS 服务
1. 登录腾讯云控制台
2. 搜索"对象存储 COS"或直接访问：https://console.cloud.tencent.com/cos
3. 点击"立即使用"开通服务

### 3. 创建存储桶
1. 在 COS 控制台点击"创建存储桶"
2. 填写配置：
   ```
   存储桶名称: resume-images-1234567890 (需要全局唯一，建议加上随机数字)
   所属地域: ap-beijing (选择离你最近的地区)
   访问权限: 私有读写 (推荐，更安全)
   ```
3. 其他配置保持默认，点击"创建"

### 4. 配置跨域访问 (CORS)
1. 进入刚创建的存储桶
2. 左侧菜单 → 安全管理 → 跨域访问CORS
3. 点击"添加规则"，填写：
   ```
   来源Origin: http://localhost:5173
   方法Methods: GET, POST, PUT, DELETE, HEAD
   Allow-Headers: *
   Expose-Headers: *
   超时Max-Age: 600
   ```
4. 如果有生产环境域名，再添加一条规则

### 5. 获取访问密钥
1. 控制台右上角头像 → 访问管理
2. 左侧菜单 → 访问密钥 → API密钥管理
3. 点击"新建密钥"
4. **重要：记录下 SecretId 和 SecretKey**

### 6. 配置环境变量
1. 复制 `backend/.env.example` 为 `backend/.env`
2. 填入配置信息：
   ```env
   TENCENT_SECRET_ID=你的SecretId
   TENCENT_SECRET_KEY=你的SecretKey
   TENCENT_COS_REGION=ap-beijing
   TENCENT_COS_BUCKET=你的存储桶名称
   ```

## 📋 地域代码参考

| 地域 | 代码 |
|------|------|
| 北京 | ap-beijing |
| 上海 | ap-shanghai |
| 广州 | ap-guangzhou |
| 成都 | ap-chengdu |
| 重庆 | ap-chongqing |
| 深圳金融 | ap-shenzhen-fsi |
| 上海金融 | ap-shanghai-fsi |
| 香港 | ap-hongkong |
| 新加坡 | ap-singapore |

## 💰 费用说明

### 免费额度（每月）
- 存储容量：50GB
- 请求次数：100万次
- 流量：10GB

### 超出免费额度后的计费
- 存储费用：约 0.118元/GB/月
- 请求费用：约 0.01元/万次
- 流量费用：约 0.5元/GB

**注意：** 个人开发项目通常不会超出免费额度

## 🔒 安全建议

### 1. 使用子账号（推荐）
1. 访问管理 → 用户 → 用户列表 → 新建用户
2. 选择"可访问资源并接收消息"
3. 为用户添加 COS 相关权限策略：
   - QcloudCOSDataFullControl（数据读写权限）
   - QcloudCOSFullAccess（完全访问权限，谨慎使用）

### 2. 权限最小化原则
- 只授予必要的权限
- 定期轮换访问密钥
- 不要在代码中硬编码密钥

### 3. 存储桶权限
- 生产环境建议使用"私有读写"
- 通过后端接口控制访问权限
- 启用防盗链保护

## 🧪 测试配置

### 1. 启动服务器
```bash
cd backend
npm start
```

### 2. 检查配置
访问：http://localhost:4000/api/auth/upload-config

正确配置会返回：
```json
{
  "success": true,
  "data": {
    "cosAvailable": true,
    "maxFileSize": "5MB",
    "allowedTypes": ["image/png", "image/jpeg", "image/jpg", "image/webp"],
    "uploadPath": "COS云存储"
  }
}
```

### 3. 测试上传
使用前端组件 `ProfilePhotoUpload` 测试图片上传功能

## ❗ 常见问题

### Q: 提示 "COS 未正确配置"
A: 检查 .env 文件中的配置是否正确，确保所有必需字段都已填写

### Q: 上传失败，提示跨域错误
A: 检查存储桶的 CORS 配置，确保包含了你的域名

### Q: 访问图片时 403 错误
A: 检查存储桶权限设置，确保允许公开读取或通过签名访问

### Q: 费用担心
A: 个人开发项目通常在免费额度内，可以在控制台设置费用预警

## 📞 技术支持

- 腾讯云文档：https://cloud.tencent.com/document/product/436
- 技术支持：https://cloud.tencent.com/act/event/connect-service
- SDK 文档：https://cloud.tencent.com/document/product/436/8629
