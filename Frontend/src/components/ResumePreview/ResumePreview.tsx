import React from 'react';
import type { ResumeFormData } from '../../types/resume';
import { getTemplateComponent } from '../ResumeTemplate';

interface ResumePreviewProps {
  data: ResumeFormData;
  templateId?: string;
  theme?: string;
  colorPalette?: string[];
  scale?: number;
}

const ResumePreview: React.FC<ResumePreviewProps> = ({ 
  data, 
  templateId = '01', 
  theme,
  colorPalette,
  scale = 0.8 
}) => {
  const TemplateComponent = getTemplateComponent(templateId);

  return (
    <div 
      className="resume-preview-container"
      style={{ 
        transform: `scale(${scale})`,
        transformOrigin: 'top left',
        width: `${100 / scale}%`,
        height: `${100 / scale}%`
      }}
    >
      <TemplateComponent 
        data={data} 
        theme={theme}
        colorPalette={colorPalette}
      />
    </div>
  );
};

export default ResumePreview;