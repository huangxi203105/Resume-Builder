import React, { useState, useRef } from 'react';
import request from '../utils/request';
import API_PATH from '../utils/apiPath';

interface ProfilePhotoUploadProps {
  currentPhoto?: string;
  onPhotoChange: (photoUrl: string) => void;
  onPhotoDelete?: () => void;
}

interface UploadInfo {
  type: 'cos' | 'local';
  url: string;
  key?: string;
  filename?: string;
  location?: string;
}

const ProfilePhotoUpload: React.FC<ProfilePhotoUploadProps> = ({
  currentPhoto,
  onPhotoChange,
  onPhotoDelete
}) => {
  const [uploading, setUploading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [error, setError] = useState<string | null>(null);
  const [uploadInfo, setUploadInfo] = useState<UploadInfo | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // 处理文件选择
  const handleFileSelect = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      console.log('选择的文件:', file);
      uploadPhoto(file);
    }
  };

  // 上传照片
  const uploadPhoto = async (file: File) => {
    // 文件验证
    const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/webp'];
    if (!allowedTypes.includes(file.type)) {
      setError('只支持 JPG、PNG、WEBP 格式的图片');
      return;
    }

    const maxSize = 5 * 1024 * 1024; // 5MB
    if (file.size > maxSize) {
      setError('图片大小不能超过 5MB');
      return;
    }

    setUploading(true);
    setError(null);
    setUploadProgress(0);

    try {
      const formData = new FormData();
      formData.append('profileImage', file);

      const res = await request.post(API_PATH.UPLOAD_PROFILE_PHOTO, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
        onUploadProgress: (progressEvent: any) => {
          const progress = Math.round(
            (progressEvent.loaded * 100) / progressEvent.total
          );
          setUploadProgress(progress);
        },
      });
      const { imageUrl, uploadInfo: info } = res.data;
      setUploadInfo(info);
      onPhotoChange(imageUrl);
      setError(null);

    } catch (err: any) {
      console.error('上传失败:', err);
      setError(err.res?.data?.message || err.message || '上传失败，请重试');
    } finally {
      setUploading(false);
      setUploadProgress(0);
    }
  };

  // 删除照片
  const handleDelete = async () => {
    if (!currentPhoto || !uploadInfo) {
      onPhotoDelete?.();
      return;
    }

    try {
      setUploading(true);

      const res: any = await request.post(API_PATH.DELETE_PROFILE_PHOTO, {
        data: {
          imageUrl: currentPhoto,
          type: uploadInfo.type,
          key: uploadInfo.key,
          filename: uploadInfo.filename,
        }
      });

      if (res.code === 200) {
        setUploadInfo(null);
        onPhotoDelete?.();
        setError(null);
      } else {
        throw new Error(res.msg || '删除失败');
      }
    } catch (err: any) {
      console.error('删除失败:', err);
      setError(err.res?.data?.message || err.message || '删除失败，请重试');
    } finally {
      setUploading(false);
    }
  };

  // 触发文件选择
  const triggerFileSelect = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="flex flex-col items-center space-y-4">
      {/* 照片预览区域 */}
      <div className="relative group">
        <div className="w-32 h-32 sm:w-36 sm:h-36 rounded-full overflow-hidden border-4 border-gray-200 shadow-lg bg-gray-50 flex items-center justify-center">
          {currentPhoto ? (
            <img
              src={currentPhoto}
              alt="证件照预览"
              className="w-full h-full object-cover"
            />
          ) : (
            <div className="text-gray-400 text-center">
              <svg className="w-12 h-12 mx-auto mb-2" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clipRule="evenodd" />
              </svg>
              <p className="text-sm">点击上传证件照</p>
            </div>
          )}
        </div>

        {/* 上传进度 */}
        {uploading && (
          <div className="absolute inset-0 bg-black bg-opacity-50 rounded-full flex items-center justify-center">
            <div className="text-white text-center">
              <div className="w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-2"></div>
              <p className="text-sm">{uploadProgress}%</p>
            </div>
          </div>
        )}
        {/* 操作按钮 */}
        {!uploading && (
          <div className="absolute -bottom-2 -right-2 flex space-x-2">
            <button
              onClick={triggerFileSelect}
              className="w-10 h-10 bg-primary cursor-pointer text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
              title="上传照片"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 9a2 2 0 012-2h.93a2 2 0 001.664-.89l.812-1.22A2 2 0 0110.07 4h3.86a2 2 0 011.664.89l.812 1.22A2 2 0 0018.07 7H19a2 2 0 012 2v9a2 2 0 01-2 2H5a2 2 0 01-2-2V9z" />
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 13a3 3 0 11-6 0 3 3 0 016 0z" />
              </svg>
            </button>

            {currentPhoto && (
              <button
                onClick={handleDelete}
                className="w-10 h-10 bg-red-500 hover:bg-red-600 text-white rounded-full flex items-center justify-center shadow-lg transition-colors"
                title="删除照片"
              >
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                </svg>
              </button>
            )}
          </div>
        )}
      </div>

      {/* 隐藏的文件输入 */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/jpg,image/png,image/webp"
        onChange={handleFileSelect}
        className="hidden"
      />

      {/* 错误信息 */}
      {error && (
        <div className="text-red-500 text-sm text-center bg-red-50 p-2 rounded-lg">
          {error}
        </div>
      )}

      {/* 上传说明 */}
      <div className="text-gray-500 text-xs text-center">
        <p>支持 JPG、PNG、WEBP 格式</p>
        <p>文件大小不超过 5MB</p>
        {uploadInfo && (
          <p className="text-green-600 mt-1">
            ✓ 已上传到 {uploadInfo.type === 'cos' ? '腾讯云COS' : '本地存储'}
          </p>
        )}
      </div>
    </div>
  );
};

export default ProfilePhotoUpload;
