import React from 'react';
import { useFormContext } from '../../../context/FormContext';

export default function ProjectsStep() {
  const { state, updateFormData } = useFormContext();
  const { formData } = state;

  const addProject = () => {
    const newProject = {
      title: '',
      description: '',
      github: '',
      liveDemo: '',
    };
    updateFormData({
      projects: [...formData.projects, newProject]
    });
  };

  const removeProject = (index: number) => {
    const updatedProjects = formData.projects.filter((_, i) => i !== index);
    updateFormData({ projects: updatedProjects });
  };

  const updateProject = (index: number, field: string, value: string) => {
    const updatedProjects = formData.projects.map((project, i) =>
      i === index ? { ...project, [field]: value } : project
    );
    updateFormData({ projects: updatedProjects });
  };

  const addAchievement = () => {
    const newAchievement = {
      name: '',
      description: '',
    };
    updateFormData({
      achievements: [...formData.achievements, newAchievement]
    });
  };

  const removeAchievement = (index: number) => {
    const updatedAchievements = formData.achievements.filter((_, i) => i !== index);
    updateFormData({ achievements: updatedAchievements });
  };

  const updateAchievement = (index: number, field: string, value: string) => {
    const updatedAchievements = formData.achievements.map((achievement, i) =>
      i === index ? { ...achievement, [field]: value } : achievement
    );
    updateFormData({ achievements: updatedAchievements });
  };

  const addCertification = () => {
    const newCertification = {
      title: '',
      issuer: '',
      year: '',
    };
    updateFormData({
      certifications: [...formData.certifications, newCertification]
    });
  };

  const removeCertification = (index: number) => {
    const updatedCertifications = formData.certifications.filter((_, i) => i !== index);
    updateFormData({ certifications: updatedCertifications });
  };

  const updateCertification = (index: number, field: string, value: string) => {
    const updatedCertifications = formData.certifications.map((cert, i) =>
      i === index ? { ...cert, [field]: value } : cert
    );
    updateFormData({ certifications: updatedCertifications });
  };

  return (
    <div className="space-y-8">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-gray-900 mb-2">项目经验</h2>
        <p className="text-gray-600">展示您的项目作品、成就和认证</p>
      </div>

      {/* 项目经验 */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">项目作品</h3>

        <div className="space-y-6">
          {formData.projects.map((project, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-6 relative">
              <button
                onClick={() => removeProject(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="space-y-4">
                {/* 项目名称 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    项目名称 *
                  </label>
                  <input
                    type="text"
                    value={project.title}
                    onChange={(e) => updateProject(index, 'title', e.target.value)}
                    placeholder="例如：电商管理系统"
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                  />
                </div>

                {/* 项目描述 */}
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    项目描述 *
                  </label>
                  <textarea
                    value={project.description}
                    onChange={(e) => updateProject(index, 'description', e.target.value)}
                    placeholder="描述项目的功能、技术栈、您的职责和项目成果..."
                    rows={3}
                    className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all resize-none"
                  />
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {/* GitHub 链接 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      GitHub 链接
                    </label>
                    <input
                      type="url"
                      value={project.github}
                      onChange={(e) => updateProject(index, 'github', e.target.value)}
                      placeholder="https://github.com/username/project"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>

                  {/* 在线演示 */}
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      在线演示
                    </label>
                    <input
                      type="url"
                      value={project.liveDemo}
                      onChange={(e) => updateProject(index, 'liveDemo', e.target.value)}
                      placeholder="https://your-project-demo.com"
                      className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-primary focus:border-transparent transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addProject}
          className="w-full py-4 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-all flex items-center justify-center space-x-2"
        >
          <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>添加项目</span>
        </button>
      </div>

      {/* 成就奖项 */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">成就奖项</h3>

        <div className="space-y-4">
          {formData.achievements.map((achievement, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 relative">
              <button
                onClick={() => removeAchievement(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    奖项名称
                  </label>
                  <input
                    type="text"
                    value={achievement.name}
                    onChange={(e) => updateAchievement(index, 'name', e.target.value)}
                    placeholder="例如：优秀员工奖"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    描述
                  </label>
                  <input
                    type="text"
                    value={achievement.description}
                    onChange={(e) => updateAchievement(index, 'description', e.target.value)}
                    placeholder="获奖原因或成就描述"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addAchievement}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-all flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>添加成就</span>
        </button>
      </div>

      {/* 证书认证 */}
      <div className="space-y-6">
        <h3 className="text-xl font-semibold text-gray-900">证书认证</h3>

        <div className="space-y-4">
          {formData.certifications.map((certification, index) => (
            <div key={index} className="bg-gray-50 rounded-xl p-4 relative">
              <button
                onClick={() => removeCertification(index)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-500 transition-colors"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                </svg>
              </button>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    证书名称
                  </label>
                  <input
                    type="text"
                    value={certification.title}
                    onChange={(e) => updateCertification(index, 'title', e.target.value)}
                    placeholder="例如：AWS认证"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    颁发机构
                  </label>
                  <input
                    type="text"
                    value={certification.issuer}
                    onChange={(e) => updateCertification(index, 'issuer', e.target.value)}
                    placeholder="例如：Amazon Web Services"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    获得年份
                  </label>
                  <input
                    type="text"
                    value={certification.year}
                    onChange={(e) => updateCertification(index, 'year', e.target.value)}
                    placeholder="2024"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
                  />
                </div>
              </div>
            </div>
          ))}
        </div>

        <button
          onClick={addCertification}
          className="w-full py-3 border-2 border-dashed border-gray-300 rounded-xl text-gray-600 hover:border-primary hover:text-primary transition-all flex items-center justify-center space-x-2"
        >
          <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z" clipRule="evenodd" />
          </svg>
          <span>添加证书</span>
        </button>
      </div>

      {/* 完成提示 */}
      <div className="bg-green-50 border border-green-200 rounded-xl p-4">
        <div className="flex">
          <svg className="w-5 h-5 text-green-400 mt-0.5" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
          </svg>
          <div className="ml-3">
            <h3 className="text-sm font-medium text-green-800">恭喜！</h3>
            <p className="text-sm text-green-700 mt-1">
              您已完成所有步骤，点击"完成"按钮生成您的专业简历。
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}