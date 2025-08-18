import React, { useRef, useState } from 'react';
import { useFormContext } from '../../context/FormContext';
import { Eye, Download } from "lucide-react";
import Modal from '../Modal';
import TemplateTwo from '../../components/ResumeTemplate/TemplateTwo';
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
  const [showModal, setShowModal] = useState(false);
  const ref = useRef(null);
  const previewResume = () => {
    console.log("preview")
    setShowModal(true);
  }
  const closeModal = () => {
    setShowModal(false);
  }
  return (
    <div className="w-full h-full py-4 flex flex-col justify-between ">
      <div className="flex flex-col space-y-8">
        {steps.map((step, index) => (
          <div key={step.id} className="flex items-center relative">
            {/* 连接线 - 竖直方向 */}
            {index < steps.length - 1 && (
              <div
                className={`absolute transition-all duration-1500 left-5 top-12 w-2 h-8 ${currentStep > index ? 'bg-green-300' : 'bg-gray-300'
                  }`}
              />
            )}

            {/* 步骤圆圈 */}
            <div
              className={`w-12 h-12 rounded-full flex items-center justify-center text-sm font-bold relative z-10 flex-shrink-0 ${currentStep > index
                ? 'bg-green-300 text-white'
                : currentStep === index
                  ? 'bg-violet-600 text-white ring-4 ring-primary/20'
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

            {/* 步骤标题 - 右侧显示 */}
            <div className="ml-4 flex-1">
              <div className={`text-sm font-medium ${currentStep > index ? 'text-green-400' : 'text-gray-500'
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
      <div className='flex flex-col justify-center gap-2'>
        <button onClick={previewResume} className='flex items-center gap-2 bg-violet-100 text-violet-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-violet-200 transition-all duration-500 active:scale-90'>
          <span><Eye size={20} /></span>
          <span>预览</span>
        </button>
        <button className='flex items-center gap-2 bg-green-100 text-green-700 px-4 py-2 rounded-lg cursor-pointer hover:bg-green-200 transition-all duration-500 active:scale-90'>
          <span><Download size={20} /></span>
          <span>下载</span>
        </button>
      </div>
      <Modal isOpen={showModal} onClose={closeModal} size='xl'>
        121313
      </Modal>
    </div>
  );
}
