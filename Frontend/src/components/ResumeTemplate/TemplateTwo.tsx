import React from 'react';
import type { ResumeFormData } from '../../types/resume';

interface TemplateTwoProps {
  data: ResumeFormData;
  theme?: string;
  colorPalette?: string[];
}

const TemplateTwo: React.FC<TemplateTwoProps> = ({ data, theme = 'themeTwo', colorPalette = ['#f046e4', '#ec4899'] }) => {
  const primaryColor = colorPalette[0] || '#f046e4';
  const secondaryColor = colorPalette[1] || '#ec4899';

  return (
    <div className="w-full max-w-4xl mx-auto bg-white shadow-lg" style={{ minHeight: '297mm' }}>
      {/* 简洁头部 */}
      <div className="p-8 border-b-4" style={{ borderColor: primaryColor }}>
        <div className="text-center">
          <h1 className="text-5xl font-light mb-2" style={{ color: primaryColor }}>
            {data.profileInfo.fullName || '姓名'}
          </h1>
          <h2 className="text-xl text-gray-600 mb-4">{data.profileInfo.designation || '职位'}</h2>

          {/* 联系信息横排 */}
          <div className="flex justify-center gap-6 text-sm text-gray-600">
            {data.contactInfo.email && <span>{data.contactInfo.email}</span>}
            {data.contactInfo.phone && <span>{data.contactInfo.phone}</span>}
            {data.contactInfo.location && <span>{data.contactInfo.location}</span>}
          </div>
        </div>
      </div>

      {/* 主要内容 */}
      <div className="p-8 space-y-8">
        {/* 个人简介 */}
        {data.profileInfo.summary && (
          <div>
            <h3 className="text-2xl font-light mb-4" style={{ color: primaryColor }}>个人简介</h3>
            <p className="text-gray-700 leading-relaxed">{data.profileInfo.summary}</p>
          </div>
        )}

        {/* 工作经历 */}
        {data.workExperience.length > 0 && (
          <div>
            <h3 className="text-2xl font-light mb-6" style={{ color: primaryColor }}>工作经历</h3>
            <div className="space-y-6">
              {data.workExperience.map((exp, index) => (
                <div key={index} className="relative pl-8">
                  <div
                    className="absolute left-0 top-2 w-3 h-3 rounded-full"
                    style={{ backgroundColor: primaryColor }}
                  />
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="text-xl font-semibold">{exp.role}</h4>
                      <p className="text-gray-600 font-medium">{exp.companyName}</p>
                    </div>
                    <span className="text-sm text-gray-500 italic">
                      {exp.startDate} - {exp.endDate}
                    </span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{exp.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* 技能和教育并排 */}
        <div className="grid grid-cols-2 gap-8">
          {/* 技能 */}
          {data.skills.length > 0 && (
            <div>
              <h3 className="text-2xl font-light mb-4" style={{ color: primaryColor }}>专业技能</h3>
              <div className="space-y-3">
                {data.skills.map((skill, index) => (
                  <div key={index} className="flex items-center gap-3">
                    <span className="font-medium w-24">{skill.name}</span>
                    <div className="flex-1 bg-gray-200 rounded-full h-2">
                      <div
                        className="h-2 rounded-full"
                        style={{
                          width: `${skill.progress}%`,
                          backgroundColor: primaryColor
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* 教育背景 */}
          {data.education.length > 0 && (
            <div>
              <h3 className="text-2xl font-light mb-4" style={{ color: primaryColor }}>教育背景</h3>
              <div className="space-y-4">
                {data.education.map((edu, index) => (
                  <div key={index}>
                    <h4 className="font-semibold">{edu.degree}</h4>
                    <p className="text-gray-600">{edu.institute}</p>
                    <p className="text-sm text-gray-500">{edu.startDate} - {edu.endDate}</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        {/* 项目经验 */}
        {data.projects.length > 0 && (
          <div>
            <h3 className="text-2xl font-light mb-4" style={{ color: primaryColor }}>项目经验</h3>
            <div className="grid grid-cols-2 gap-6">
              {data.projects.map((project, index) => (
                <div key={index} className="border-l-4 pl-4" style={{ borderColor: secondaryColor }}>
                  <h4 className="font-semibold text-lg">{project.title}</h4>
                  <p className="text-sm text-gray-700 mt-2">{project.description}</p>
                  <div className="flex gap-3 mt-2 text-xs">
                    {project.github && (
                      <a href={project.github} className="text-blue-600">GitHub</a>
                    )}
                    {project.liveDemo && (
                      <a href={project.liveDemo} className="text-green-600">Demo</a>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TemplateTwo;