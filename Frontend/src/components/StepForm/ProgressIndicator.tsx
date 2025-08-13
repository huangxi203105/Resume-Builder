import React from 'react';
import { useFormContext } from './FormContext';

const steps = [
  { id: 0, title: '基本信息', description: '个人资料' },
  { id: 1, title: '联系方式', description: '联系信息' },
  { id: 2, title: '工作经历', description: '职业经验' },
  { id: 3, title: '教育背景', description: '学历信息' },
  { id: 4, title: '技能专长', description: '专业技能' },
  { id: 5, title: '项目经验', description: '项目作品' },
];

export default function ProgressIndicator() {
  const { state } = useFormContext();
  const { currentStep } = state;

  return (
    <div className="w-full py-6">
      <div className="flex items-center justify-between">
        {steps.map((step, index) => (
          <div key={step.id} className="flex flex-col items-center relative">
            {/* 连接线 */}
            {index < steps.length - 1 && (
              <div 
                className={`absolute top-6 left-8 w-full h-0.5 ${
                  currentStep > index ? 'bg-primary' : 'bg-gray-300'
                }`}
                style={{ width: 'calc(100vw / 6 - 2rem)' }}
              />
            )}
            
            {/* 步骤圆圈 */}
            <div 
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold relative z-10 ${
                currentStep > index 
                  ? 'bg-primary text-white' 
                  : currentStep === index
                  ? 'bg-primary text-white ring-4 ring-primary/20'
                  : 'bg-gray-200 text-gray-500'
              }`}
            >
              {currentStep > index ? (
                <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                </svg>
              ) : (
                index + 1
              )}
            </div>
            
            {/* 步骤标题 */}
            <div className="mt-2 text-center">
              <div className={`text-sm font-medium ${
                currentStep >= index ? 'text-primary' : 'text-gray-500'
              }`}>
                {step.title}
              </div>
              <div className="text-xs text-gray-400 mt-1">
                {step.description}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}