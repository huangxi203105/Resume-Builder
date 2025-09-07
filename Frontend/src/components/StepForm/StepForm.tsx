import React, { useEffect, useState } from "react";
import { useFormContext } from "../../context/FormContext";
import ProgressIndicator from "./ProgressIndicator";
import ProfileStep from "./steps/ProfileStep";
import ContactStep from "./steps/ContactStep";
import ExperienceStep from "./steps/ExperienceStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import ProjectsStep from "./steps/ProjectsStep";
import { NextBtn } from "../NextBtn/NextBtn";
import request from "../../utils/request";
import API_PATH from "../../utils/apiPath";
import { useNavigate, useParams } from "react-router-dom";
import Toast from "../../utils/toast";
import type { ResumeFormData } from "../../types/resume";

const stepComponents = [
  ProfileStep,
  ContactStep,
  ExperienceStep,
  EducationStep,
  SkillsStep,
  ProjectsStep,
];

function StepFormContent() {
  const { state, nextStep, prevStep, updateFormData } = useFormContext();
  const { currentStep } = state;
  const navigate = useNavigate();
  const { id } = useParams();
  const CurrentStepComponent = stepComponents[currentStep];
  const isLastStep = currentStep === stepComponents.length - 1;
  const isFirstStep = currentStep === 0;
  const [resume, setResume] = useState<ResumeFormData | null>(null);
  const [loading, setLoading] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // 加载简历数据
  useEffect(() => {
    const getResumeById = async () => {
      if (!id) return;
      
      try {
        setLoading(true);
        const res = await request.get(API_PATH.GET_BY_ID(id));
        const resumeData = res.data;
        setResume(resumeData);
        setIsEditMode(true);
        
        // 更新表单数据
        updateFormData({
          title: resumeData.title || "",
          profileInfo: resumeData.profileInfo || {},
          workExperience: resumeData.workExperience || [],
          education: resumeData.education || [],
          skills: resumeData.skills || [],
          projects: resumeData.projects || [],
          achievements: resumeData.achievements || [],
          certifications: resumeData.certifications || [],
          languages: resumeData.languages || [],
          interests: resumeData.interests || [],
          contactInfo: resumeData.contactInfo || {},
        });
      } catch (err: any) {
        console.error("加载简历失败:", err);
        Toast.error("加载简历失败");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      getResumeById();
    }
  }, [id]);

  // 提交表单
  const submitForm = async () => {
    if (isLastStep) {
      try {
        setLoading(true);
        
        if (isEditMode && id) {
          // 编辑模式：更新简历
          console.log(1233)
          const res = await request.post(API_PATH.UPDATE(id), state.formData);
          Toast.success("简历更新成功！");
          navigate(`/resumeList`);
        } else {
          // 创建模式：新建简历
          const res = await request.post(API_PATH.CREATE_RESUME, state.formData);
          Toast.success("简历创建成功！");
          navigate(`/resumeList`);
        }
      } catch (err: any) {
        const errorMsg = err.data?.msg || "操作失败，请重试";
        Toast.error(errorMsg);
        console.error("提交失败:", err);
      } finally {
        setLoading(false);
      }
    } else {
      nextStep();
    }
  };

  // 加载状态
  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-violet-600"></div>
      </div>
    );
  }

  return (
    <div className="max-w-7xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 页面标题 */}
        <div className="bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-8 py-6">
          <h1 className="text-2xl font-bold">
            {isEditMode ? "编辑简历" : "创建新简历"}
          </h1>
          <p className="text-violet-100 mt-1">
            {isEditMode ? `正在编辑：${resume?.title || '未命名简历'}` : "开始构建你的专业简历"}
          </p>
        </div>

        {/* 主要内容区域 - 左右布局 */}
        <div className="flex">
          {/* 左侧进度指示器 */}
          <div className="bg-gray-50 p-6 border-r border-gray-200">
            <ProgressIndicator />
          </div>

          {/* 右侧表单内容 */}
          <div className="flex-1">
            {/* 表单内容 */}
            <div className="p-8">
              <CurrentStepComponent />
            </div>

            {/* 导航按钮 */}
            <div className="bg-gray-50 px-8 py-6 flex justify-between border-t border-gray-200">
              <button
                onClick={prevStep}
                disabled={isFirstStep}
                className={`px-6 py-3 rounded-xl font-medium transition-all ${
                  isFirstStep
                    ? "bg-gray-200 text-gray-400 cursor-not-allowed"
                    : "bg-gray-200 text-gray-700 hover:bg-gray-300"
                }`}
              >
                上一步
              </button>
              <NextBtn
                onClick={submitForm}
                msg={isLastStep ? (isEditMode ? "保存更改" : "完成创建") : "下一步"}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function StepForm() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-pink-50 py-8">
      <StepFormContent />
    </div>
  );
}
