import React from 'react';
import { useFormContext } from '../../../context/FormContext';

export default function SkillsStep() {
  const { state, updateFormData } = useFormContext();
  const { formData } = state;

  const addSkill = () => {
    const newSkill = {
      name: '',
      progress: 50,
    };
    updateFormData({
      skills: [...formData.skills, newSkill]
    });
  };

  const removeSkill = (index: number) => {
    const updatedSkills = formData.skills.filter((_, i) => i !== index);
    updateFormData({ skills: updatedSkills });
  };

  const updateSkill = (index: number, field: string, value: string | number) => {
    const updatedSkills = formData.skills.map((skill, i) =>
      i === index ? { ...skill, [field]: value } : skill
    );
    updateFormData({ skills: updatedSkills });
  };

  const addLanguage = () => {
    const newLanguage = {
      name: '',
      progress: 50,
    };
    updateFormData({
      languages: [...formData.languages, newLanguage]
    });
  };

  const removeLanguage = (index: number) => {
    const updatedLanguages = formData.languages.filter((_, i) => i !== index);
    updateFormData({ languages: updatedLanguages });
  };

  const updateLanguage = (index: number, field: string, value: string | number) => {
    const updatedLanguages = formData.languages.map((lang, i) =>
      i === index ? { ...lang, [field]: value } : lang
    );
    updateFormData({ languages: updatedLanguages });
  };

  const addInterest = () => {
    updateFormData({
      interests: [...formData.interests, '']
    });
  };

  const removeInterest = (index: number) => {
    const updatedInterests = formData.interests.filter((_, i) => i !== index);
    updateFormData({ interests: updatedInterests });
  };

  const updateInterest = (index: number, value: string) => {
    const updatedInterests = formData.interests.map((interest, i) =>
      i === index ? value : interest
    );
    updateFormData({ interests: updatedInterests });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">技能专长</h2>
        <p className="text-gray-600">展示您的专业技能、语言能力和兴趣爱好</p>
      </div>

      {/* 专业技能 */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">专业技能</h3>

        <div className="space-y-4">
          {formData.skills.map((skill, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 relative">
              <button
                onClick={() => removeSkill(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    技能名称
                  </label>
                  <input
                    type="text"
                    value={skill.name}
                    onChange={(e) => updateSkill(index, 'name', e.target.value)}
                    placeholder="例如：React、Python、UI设计"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    熟练度 ({skill.progress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={skill.progress}
                    onChange={(e) => updateSkill(index, 'progress', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addSkill}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-all flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>添加技能</span>
        </button>
      </div>

      {/* 语言能力 */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">语言能力</h3>

        <div className="space-y-4">
          {formData.languages.map((language, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 relative">
              <button
                onClick={() => removeLanguage(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-end">
                <div className="md:col-span-2">
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    语言
                  </label>
                  <input
                    type="text"
                    value={language.name}
                    onChange={(e) => updateLanguage(index, 'name', e.target.value)}
                    placeholder="例如：英语、日语、法语"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    水平 ({language.progress}%)
                  </label>
                  <input
                    type="range"
                    min="0"
                    max="100"
                    value={language.progress}
                    onChange={(e) => updateLanguage(index, 'progress', parseInt(e.target.value))}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addLanguage}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-all flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>添加语言</span>
        </button>
      </div>

      {/* 兴趣爱好 */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">兴趣爱好</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {formData.interests.map((interest, index) => (
            <div key={index} className="relative">
              <input
                type="text"
                value={interest}
                onChange={(e) => updateInterest(index, e.target.value)}
                placeholder="例如：摄影、旅行、阅读"
                className="w-full px-3 py-2 pr-8 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              />
              <button
                onClick={() => removeInterest(index)}
                className="absolute right-2 top-2 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>
            </div>
          ))}
        </div>

        <button
          onClick={addInterest}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-all flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>添加兴趣</span>
        </button>
      </div>
    </div>
  );
}