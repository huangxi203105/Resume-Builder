import React from 'react';
import { useFormContext } from '../../../context/FormContext';
import Input from '../../Input';

export default function EducationStep() {
  const { state, updateFormData } = useFormContext();
  const { formData } = state;

  const addEducation = () => {
    const newEducation = {
      degree: '',
      institute: '',
      startDate: '',
      endDate: '',
    };
    updateFormData({
      education: [...formData.education, newEducation]
    });
  };

  const removeEducation = (index: number) => {
    const updatedEducation = formData.education.filter((_, i) => i !== index);
    updateFormData({ education: updatedEducation });
  };

  const updateEducation = (index: number, field: string, value: string) => {
    const updatedEducation = formData.education.map((edu, i) =>
      i === index ? { ...edu, [field]: value } : edu
    );
    updateFormData({ education: updatedEducation });
  };

  return (
    <div className="space-y-6">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">教育背景</h2>
        <p className="text-gray-600">展示您的学历信息和学术成就</p>
      </div>

      <div className="space-y-6">
        {formData.education.map((education, index) => (
          <div key={index} className="bg-gray-50 rounded-xl p-6 relative">
            <button
              onClick={() => removeEducation(index)}
              className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
            >
              <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </button>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Input
                type="text"
                value={education.degree}
                onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                placeholder="学位/学历"
                label="学位/学历 *"
              />
              <Input
                type="text"
                value={education.institute}
                onChange={(e) => updateEducation(index, 'institute', e.target.value)}
                placeholder="学校名称"
                label="学校名称 *"
              />
              <Input
                type="date"
                value={education.startDate}
                onChange={(e) => updateEducation(index, 'startDate', e.target.value)}
                label="开始时间 *"
              />
              <Input
                type="date"
                value={education.endDate}
                onChange={(e) => updateEducation(index, 'endDate', e.target.value)}
                label="结束时间"
              />
            </div>
          </div>
        ))}
      </div>

      <button
        onClick={addEducation}
        className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-colors"
      >
        + 添加教育经历
      </button>

      {/* 提示信息 */}
      {formData.education.length === 0 && (
        <div className="bg-blue-50 border border-blue-200 rounded-xl p-4">
          <div className="flex">
            <svg className="w-5 h-5 text-blue-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
            </svg>
            <div className="ml-3">
              <h3 className="text-sm font-medium text-blue-800">提示</h3>
              <p className="text-sm text-blue-700 mt-1">
                添加您的教育背景，按时间倒序排列（最新的在前）。
              </p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
