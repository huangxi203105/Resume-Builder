import TemplateOne from './TemplateOne';
import TemplateTwo from './TemplateTwo';
import type { ResumeFormData } from '../../types/resume';

export interface TemplateProps {
  data: ResumeFormData;
  theme?: string;
  colorPalette?: string[];
}

export const templateComponents = {
  '01': TemplateOne,
  '02': TemplateTwo,
  // 可以继续添加更多模板
};

export const getTemplateComponent = (templateId: string) => {
  return templateComponents[templateId as keyof typeof templateComponents] || TemplateOne;
};

export { TemplateOne, TemplateTwo };