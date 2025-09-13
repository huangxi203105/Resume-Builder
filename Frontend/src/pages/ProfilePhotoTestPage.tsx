import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import ProfilePhotoUpload from '../components/ProfilePhotoUpload';
import request from '../utils/request';
import API_PATH from '../utils/apiPath';
import { navigateTo } from '../utils/navigation';

interface UploadConfig {
  cosAvailable: boolean;
  maxFileSize: string;
  allowedTypes: string[];
  uploadPath: string;
}

const ProfilePhotoTestPage: React.FC = () => {
  const [currentPhoto, setCurrentPhoto] = useState<string>('');
  const [uploadConfig, setUploadConfig] = useState<UploadConfig | null>(null);
  const [loading, setLoading] = useState(true);

  // 获取上传配置
  useEffect(() => {
    const fetchUploadConfig = async () => {
      try {
        const response = await request.get(API_PATH.GET_UPLOAD_CONFIG);
        setUploadConfig(response.data);
      } catch (error) {
        console.error('获取上传配置失败:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUploadConfig();
  }, []);

  const handlePhotoChange = (photoUrl: string) => {
    setCurrentPhoto(photoUrl);
    console.log('新的照片URL:', photoUrl);
  };

  const handlePhotoDelete = () => {
    setCurrentPhoto('');
    console.log('照片已删除');
  };

  // const goBack = () => {
  //   navigateTo(-1);
  // };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-2 border-violet-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">加载中...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* 头部导航 */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-4xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <button
                onClick={goBack}
                className="flex items-center text-gray-600 hover:text-gray-800 transition-colors"
              >
                <svg className="w-5 h-5 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                </svg>
                返回
              </button>
              <h1 className="text-2xl font-bold text-gray-800">证件照上传测试</h1>
            </div>

            {uploadConfig && (
              <div className="flex items-center space-x-2">
                <span className={`px-2 py-1 rounded-full text-xs font-medium ${uploadConfig.cosAvailable
                  ? 'bg-green-100 text-green-800'
                  : 'bg-yellow-100 text-yellow-800'
                  }`}>
                  {uploadConfig.uploadPath}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="max-w-4xl mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-sm p-8">
          <div className="text-center mb-8">
            <h2 className="text-xl font-semibold text-gray-800 mb-2">上传证件照</h2>
            <p className="text-gray-600">测试腾讯云 COS 图片上传功能</p>
          </div>

          {/* 上传组件 */}
          <div className="flex justify-center mb-8">
            <ProfilePhotoUpload
              currentPhoto={currentPhoto}
              onPhotoChange={handlePhotoChange}
              onPhotoDelete={handlePhotoDelete}
            />
          </div>

          {/* 配置信息 */}
          {uploadConfig && (
            <div className="bg-gray-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">上传配置信息</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">存储方式</label>
                  <p className="text-sm text-gray-600">{uploadConfig.uploadPath}</p>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">最大文件大小</label>
                  <p className="text-sm text-gray-600">{uploadConfig.maxFileSize}</p>
                </div>
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-1">支持的文件类型</label>
                  <p className="text-sm text-gray-600">{uploadConfig.allowedTypes.join(', ')}</p>
                </div>
              </div>
            </div>
          )}

          {/* 当前照片信息 */}
          {currentPhoto && (
            <div className="mt-6 bg-blue-50 rounded-lg p-6">
              <h3 className="text-lg font-medium text-gray-800 mb-4">当前照片信息</h3>
              <div className="break-all">
                <label className="block text-sm font-medium text-gray-700 mb-1">图片URL</label>
                <p className="text-sm text-gray-600 bg-white p-2 rounded border">
                  {currentPhoto}
                </p>
              </div>
              <div className="mt-4">
                <a
                  href={currentPhoto}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-4 py-2 bg-blue-600 text-white text-sm font-medium rounded-lg hover:bg-blue-700 transition-colors"
                >
                  在新窗口中查看
                  <svg className="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                </a>
              </div>
            </div>
          )}

          {/* 使用说明 */}
          <div className="mt-8 bg-yellow-50 rounded-lg p-6">
            <h3 className="text-lg font-medium text-gray-800 mb-4">使用说明</h3>
            <ul className="text-sm text-gray-600 space-y-2">
              <li>• 支持 JPG、PNG、WEBP 格式的图片文件</li>
              <li>• 文件大小不能超过 5MB</li>
              <li>• 如果配置了腾讯云 COS，图片将上传到云存储</li>
              <li>• 如果未配置 COS，图片将保存到本地服务器</li>
              <li>• 上传成功后会显示图片的访问 URL</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePhotoTestPage;
