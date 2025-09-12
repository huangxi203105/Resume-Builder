import React from "react";
import { useFormContext } from "../../../context/FormContext";
import Input from "../../Input";
import ProfilePhotoUpload from "../../ProfilePhotoUpload";

export default function ProfileStep() {
  const { state, updateFormData } = useFormContext();
  const { formData } = state;

  const handleInputChange = (field: string, value: string) => {
    if (field.includes(".")) {
      const [parent, child] = field.split(".");
      const parentKey = parent as keyof typeof formData;
      const parentData = formData[parentKey];
      // 类型检查确保是普通对象
      if (
        parentData &&
        typeof parentData === "object" &&
        !Array.isArray(parentData) &&
        parentData !== null
      ) {
        updateFormData({
          [parentKey]: {
            ...parentData,
            [child]: value,
          },
        });
      }
    } else {
      updateFormData({ [field]: value });
    }
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">基本信息</h2>
        <p className="text-gray-600">让我们从您的基本信息开始</p>
      </div>

      {/* 简历标题 */}
      <div>
        <Input
          type="text"
          value={formData.title}
          onChange={(e) => handleInputChange("title", e.target.value)}
          placeholder="例如：前端开发工程师简历"
          label="简历标题 *"
        />
      </div>

      {/* 姓名 */}
      <div>
        <Input
          type="text"
          value={formData.profileInfo.fullName}
          onChange={(e) =>
            handleInputChange("profileInfo.fullName", e.target.value)
          }
          placeholder="请输入您的姓名"
          label="姓名 *"
        />
      </div>

      {/* 职位 */}
      <div>
        <Input
          type="text"
          value={formData.profileInfo.designation}
          onChange={(e) =>
            handleInputChange("profileInfo.designation", e.target.value)
          }
          placeholder="例如：前端开发工程师"
          label="目标职位 *"
        />
      </div>

      {/* 个人简介 */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          个人简介
        </label>
        <textarea
          value={formData.profileInfo.summary}
          onChange={(e) =>
            handleInputChange("profileInfo.summary", e.target.value)
          }
          placeholder="简要介绍您的专业背景、技能特长和职业目标..."
          rows={4}
          className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none placeholder:text-gray-400 placeholder:font-light"
        />
        <p className="text-sm text-gray-500 mt-1">建议 100-200 字</p>
      </div>

      {/* 头像上传区域 */}
      <ProfilePhotoUpload
        currentPhoto={formData.profileInfo.profilePreviewUrl}
        onPhotoChange={(url) =>
          handleInputChange("profileInfo.profilePreviewUrl", url)
        }
        onPhotoDelete={() =>
          handleInputChange("profileInfo.profilePreviewUrl", "")
        }
      />
    </div>
  );
}
