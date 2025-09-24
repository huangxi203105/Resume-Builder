import React from 'react';
import type { ResumeFormData } from '../../types/resume';
import { Proficiency } from '../../model';

interface TemplateOneProps {
  data: ResumeFormData;
  theme?: string;
  colorPalette?: string[];
}

const TemplateOne: React.FC<TemplateOneProps> = ({ data, theme = 'themeOne', colorPalette = ['#9358ff', '#6366f1'] }) => {
  const primaryColor = colorPalette[0] || '#9358ff';
  const secondaryColor = colorPalette[1] || '#6366f1';
  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg min-h-[297mm]">
      {/* 头部区域 */}
      <div className="relative" style={{ backgroundColor: primaryColor }}>
        <div className="p-8 text-white">
          <div className="flex items-center gap-6">
            {/* 头像区域 */}
            {data.profileInfo.profilePreviewUrl && (
              <div className="w-32 h-32 rounded-full overflow-hidden border-4 border-white shadow-lg">
                <img
                  src={data.profileInfo.profilePreviewUrl}
                  alt={data.profileInfo.fullName}
                  className="w-full h-full object-cover"
                />
              </div>
            )}

            {/* 基本信息 */}
            <div className="flex-1">
              <h1 className="text-4xl font-bold mb-2">{data.profileInfo.fullName || '姓名'}</h1>
              <h2 className="text-xl font-light mb-4">{data.profileInfo.designation || '职位'}</h2>

              {/* 联系信息 */}
              <div className="grid grid-cols-2 gap-2 text-sm">
                {data.contactInfo.email && (
                  <div className="flex items-center gap-2">
                    <span>📧</span>
                    <span>{data.contactInfo.email}</span>
                  </div>
                )}
                {data.contactInfo.phone && (
                  <div className="flex items-center gap-2">
                    <span>📱</span>
                    <span>{data.contactInfo.phone}</span>
                  </div>
                )}
                {data.contactInfo.location && (
                  <div className="flex items-center gap-2">
                    <span>📍</span>
                    <span>{data.contactInfo.location}</span>
                  </div>
                )}
                {data.contactInfo.linkedin && (
                  <div className="flex items-center gap-2">
                    <span>💼</span>
                    <span className="truncate">{data.contactInfo.linkedin}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* 主体内容 */}
      <div className="flex">
        {/* 左侧栏 */}
        <div className="w-1/3 bg-gray-50 p-6">
          {/* 个人简介 */}
          {data.profileInfo.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>个人简介</h3>
              <p className="text-sm text-gray-700 leading-relaxed">{data.profileInfo.summary}</p>
            </div>
          )}

          {/* 技能 */}
          {data.skills.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>专业技能</h3>
              <div className="space-y-3">
                {data.skills.map((skill, index) => (
                  <div key={index}>
                    <div className="flex justify-between text-sm mb-1">
                      <span className="font-medium">{skill.name}</span>
                      <span className="text-gray-500">{Proficiency[skill.progress].label}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 语言能力 */}
          {data.languages.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>语言能力</h3>
              <div className="space-y-2">
                {data.languages.map((language, index) => (
                  <div key={index} className="flex justify-between text-sm">
                    <span className="font-medium">{language.name}</span>
                    <span className="text-gray-500">{Proficiency[language.progress].label}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 兴趣爱好 */}
          {data.interests.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-bold mb-3" style={{ color: primaryColor }}>兴趣爱好</h3>
              <div className="flex flex-wrap gap-2">
                {data.interests.map((interest, index) => (
                  <span
                    key={index}
                    className="px-2 py-1 text-xs rounded-full text-white"
                    style={{ backgroundColor: secondaryColor }}
                  >
                    {interest}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 右侧主要内容 */}
        <div className="w-2/3 p-6">
          {/* 工作经历 */}
          {data.workExperience.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>工作经历</h3>
              <div className="space-y-6">
                {data.workExperience.map((exp, index) => (
                  <div key={index} className="border-l-4 pl-4" style={{ borderColor: primaryColor }}>
                    <div className="flex justify-between items-start mb-2">
                      <div>
                        <h4 className="font-bold text-lg">{exp.role}</h4>
                        <p className="text-gray-600 font-medium">{exp.companyName}</p>
                      </div>
                      <span className="text-sm text-gray-500 bg-gray-100 px-2 py-1 rounded">
                        {exp.startDate} - {exp.endDate}
                      </span>
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 教育背景 */}
          {data.education.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>教育背景</h3>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index} className="flex justify-between items-center">
                    <div>
                      <h4 className="font-bold">{edu.degree}</h4>
                      <p className="text-gray-600">{edu.institute}</p>
                    </div>
                    <span className="text-sm text-gray-500">
                      {edu.startDate} - {edu.endDate}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 项目经验 */}
          {data.projects.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>项目经验</h3>
              <div className="space-y-4">
                {data.projects.map((project, index) => (
                  <div key={index} className="border rounded-lg p-4 bg-gray-50">
                    <h4 className="font-bold text-lg mb-2">{project.title}</h4>
                    <p className="text-sm text-gray-700 mb-3">{project.description}</p>
                    <div className="flex gap-4 text-xs">
                      {project.github && (
                        <a href={project.github} className="text-blue-600 hover:underline">
                          🔗 GitHub
                        </a>
                      )}
                      {project.liveDemo && (
                        <a href={project.liveDemo} className="text-green-600 hover:underline">
                          🚀 Live Demo
                        </a>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 成就奖项 */}
          {data.achievements.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>成就奖项</h3>
              <div className="space-y-3">
                {data.achievements.map((achievement, index) => (
                  <div key={index}>
                    <h4 className="font-bold">{achievement.name}</h4>
                    <p className="text-sm text-gray-700">{achievement.description}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 证书认证 */}
          {data.certifications.length > 0 && (
            <div className="mb-8">
              <h3 className="text-xl font-bold mb-4" style={{ color: primaryColor }}>证书认证</h3>
              <div className="grid grid-cols-2 gap-4">
                {data.certifications.map((cert, index) => (
                  <div key={index} className="border rounded-lg p-3 bg-gray-50">
                    <h4 className="font-bold text-sm">{cert.title}</h4>
                    <p className="text-xs text-gray-600">{cert.issuer}</p>
                    <p className="text-xs text-gray-500">{cert.year}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default TemplateOne;