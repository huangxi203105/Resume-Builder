# 🚀 腾讯云 COS 证件照上传功能

## 📋 功能概述

已为你的简历构建器项目集成了腾讯云 COS 图片上传功能，支持证件照的云存储和本地存储双模式。

## 🎯 主要特性

- ✅ **智能存储切换**：自动检测 COS 配置，支持云存储和本地存储
- ✅ **文件格式验证**：支持 JPG、PNG、WEBP 格式
- ✅ **文件大小限制**：最大 5MB
- ✅ **上传进度显示**：实时显示上传进度
- ✅ **错误处理**：完善的错误提示和处理机制
- ✅ **文件管理**：支持删除已上传的图片

## 🛠️ 快速配置

### 1. 安装依赖（已完成）
```bash
cd backend
npm install cos-nodejs-sdk-v5
```

### 2. 配置腾讯云 COS

#### 方法一：按照详细指南配置
查看 `backend/COS_CONFIG_GUIDE.md` 获取完整的配置步骤

#### 方法二：快速配置
1. 复制环境变量模板：
   ```bash
   cp backend/.env.example backend/.env
   ```

2. 填写 COS 配置信息：
   ```env
   TENCENT_SECRET_ID=你的SecretId
   TENCENT_SECRET_KEY=你的SecretKey
   TENCENT_COS_REGION=ap-beijing
   TENCENT_COS_BUCKET=你的存储桶名称
   ```

### 3. 启动服务

```bash
# 启动后端服务
cd backend
npm start

# 启动前端服务
cd Frontend
npm run dev
```

## 🧪 测试功能

### 方法一：使用测试页面
1. 访问：http://localhost:5173/
2. 点击 "Test Photo Upload" 按钮
3. 进入证件照上传测试页面

### 方法二：直接访问测试页面
访问：http://localhost:5173/profile-photo-test

### 方法三：API 测试
```bash
# 检查上传配置
curl http://localhost:4000/api/auth/upload-config

# 上传图片（需要登录 token）
curl -X POST http://localhost:4000/api/auth/upload-profile-photo \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -F "profileImage=@/path/to/your/image.jpg"
```

## 📁 文件结构

```
backend/
├── config/
│   └── cos.js                    # COS 配置和工具函数
├── middleware/
│   └── cosUploadMiddleware.js    # COS 上传中间件
├── controllers/
│   └── profileImageController.js # 证件照上传控制器
├── routes/
│   └── userRoutes.js            # 用户路由（包含上传路由）
├── .env.example                 # 环境变量模板
└── COS_CONFIG_GUIDE.md         # 详细配置指南

Frontend/
├── src/
│   ├── components/
│   │   └── ProfilePhotoUpload.tsx  # 证件照上传组件
│   ├── pages/
│   │   └── ProfilePhotoTestPage.tsx # 测试页面
│   └── utils/
│       └── apiPath.ts              # API 路径配置
```

## 🔧 API 端点

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/auth/upload-profile-photo` | 上传证件照 |
| DELETE | `/api/auth/delete-profile-photo` | 删除证件照 |
| GET | `/api/auth/upload-config` | 获取上传配置 |

## 💡 使用组件

在你的 React 组件中使用证件照上传功能：

```tsx
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';

const YourComponent = () => {
  const [photoUrl, setPhotoUrl] = useState('');

  const handlePhotoChange = (url: string) => {
    setPhotoUrl(url);
    // 保存到表单数据或发送到后端
  };

  const handlePhotoDelete = () => {
    setPhotoUrl('');
    // 清除表单数据
  };

  return (
    <ProfilePhotoUpload
      currentPhoto={photoUrl}
      onPhotoChange={handlePhotoChange}
      onPhotoDelete={handlePhotoDelete}
    />
  );
};
```

## 🔒 安全说明

- 所有上传操作都需要用户认证
- 文件类型和大小都有严格限制
- COS 访问密钥存储在服务端，不暴露给前端
- 支持私有存储桶配置

## 📊 存储模式

### COS 云存储模式
- 文件存储在腾讯云 COS
- 全球 CDN 加速访问
- 高可用性和可扩展性
- 按使用量付费

### 本地存储模式
- 文件存储在服务器本地
- 适合开发和测试环境
- 无额外费用
- 需要考虑服务器存储空间

## ❗ 注意事项

1. **首次使用**：如果没有配置 COS，系统会自动使用本地存储
2. **费用控制**：个人开发项目通常在 COS 免费额度内
3. **权限管理**：建议使用子账号和最小权限原则
4. **备份策略**：重要文件建议定期备份

## 🆘 故障排除

### 常见问题

1. **上传失败**：检查网络连接和 COS 配置
2. **跨域错误**：检查 COS 存储桶的 CORS 设置
3. **权限错误**：检查 API 密钥权限
4. **文件过大**：确保文件小于 5MB

### 获取帮助

- 查看 `backend/COS_CONFIG_GUIDE.md` 详细配置指南
- 检查浏览器控制台错误信息
- 查看服务器日志输出

## 🎉 完成！

现在你可以开始使用证件照上传功能了！如果需要集成到简历编辑页面，只需要在相应的组件中引入 `ProfilePhotoUpload` 组件即可。
