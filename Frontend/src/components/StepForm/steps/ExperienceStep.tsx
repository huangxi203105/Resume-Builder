import React from 'react';
import { useFormContext } from '../FormContext';

export default function ExperienceStep() {
  const { state, updateFormData } = useFormContext();
  const { formData } = state;

  const addExperience = () => {
    const newExperience = {
      companyName: '',
      role: '',
      startDate: '',
      endDate: '',
      description: '',
    };
    updateFormData({
      workExperience: [...formData.workExperience, newExperience]
    });
  };

  const removeExperience = (index: number) => {
    const updatedExperience = formData.workExperience.filter((_, i) => i !== index);
    updateFormData({ workExperience: updatedExperience });
  };

  const updateExperience = (index: number, field: string, value: string) => {
    const updatedExperience = formData.workExperience.map((exp, i) => 
      i === index ? { ...exp, [field]: value } : exp
    );
    updateFormData({ workExperience: updatedExperience });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">工作经历</h2>
        <p className="text-gray-600">展示您的职业发展历程和工作成就</p>
      </div>

      {/* 工作经历列表 */}
      <div className="space-y-6">
        {formData.workExperience.map((experience, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 relative">
            {/* 删除按钮 */}
            <button
              onClick={() => removeExperience(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* 公司名称 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  公司名称 *
                </label>
                <input
                  type="text"
                  value={experience.companyName}
                  onChange={(e) => updateExperience(index, 'companyName', e.target.value)}
                  placeholder="例如：阿里巴巴集团"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* 职位 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  职位 *
                </label>
                <input
                  type="text"
                  value={experience.role}
                  onChange={(e) => updateExperience(index, 'role', e.target.value)}
                  placeholder="例如：前端开发工程师"
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* 开始时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  开始时间 *
                </label>
                <input
                  type="month"
                  value={experience.startDate}
                  onChange={(e) => updateExperience(index, 'startDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
              </div>

              {/* 结束时间 */}
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  结束时间
                </label>
                <input
                  type="month"
                  value={experience.endDate}
                  onChange={(e) => updateExperience(index, 'endDate', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                />
                <p className="text-sm text-gray-500 mt-1">留空表示至今</p>
              </div>
            </div>

            {/* 工作描述 */}
            <div className="mt-4">
              <label className="block text-sm font-medium text-gray-700 mb-2">
                工作描述
              </label>
              <textarea
                value={experience.description}
                onChange={(e) => updateExperience(index, 'description', e.target.value)}
                placeholder="描述您在该职位的主要职责、工作成果和技能运用..."
                rows={3}
                className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
              />
            </div>
          </div>
        ))}
      </div>

      {/* 添加工作经历按钮 */}
      <button
        onClick={addExperience}
        className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-all flex items-center justify-center space-x-2"
      >
        <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
          <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
        </svg>
        <span>添加工作经历</span>
      </button>

      {/* 提示信息 */}
      {formData.workExperience.length === 0 && (
        <div className="bg-yellow-50 border border-yellow-200 rounded-xl p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-yellow-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-yellow-800">建议</h3>
              <p className="text-sm text-yellow-700 mt-1">
                添加至少一段工作经历，按时间倒序排列（最新的在前）。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}