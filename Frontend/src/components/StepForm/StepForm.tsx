import React from "react";
import { useFormContext } from "../../context/FormContext";
import ProgressIndicator from "./ProgressIndicator";
import ProfileStep from "./steps/ProfileStep";
import ContactStep from "./steps/ContactStep";
import ExperienceStep from "./steps/ExperienceStep";
import EducationStep from "./steps/EducationStep";
import SkillsStep from "./steps/SkillsStep";
import ProjectsStep from "./steps/ProjectsStep";
import { NextBtn } from "../NextBtn/NextBtn";
import http from "../../utils/http";
import API_PATH from "../../utils/apiPath";
import { useNavigate } from "react-router-dom";
import Toast from "../../utils/toast";

const stepComponents = [
  ProfileStep,
  ContactStep,
  ExperienceStep,
  EducationStep,
  SkillsStep,
  ProjectsStep,
];

function StepFormContent() {
  const { state, nextStep, prevStep } = useFormContext();
  const { currentStep } = state;
  const navigate = useNavigate();

  const CurrentStepComponent = stepComponents[currentStep];
  const isLastStep = currentStep === stepComponents.length - 1;
  const isFirstStep = currentStep === 0;
  const submitForm = async () => {
    if (isLastStep) {
      try {
        const res = await http.post(API_PATH.CREATE_RESUME, state.formData);
        console.log(res);
        navigate(`/resumeDetail/${res.data.id}`);
        Toast.success("简历创建成功！");
      } catch (err: any) {
        Toast.error(err.data.msg);
        console.log(err);
      }
    } else {
      nextStep();
    }
  };
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
        {/* 进度指示器 */}
        <div className="bg-gray-50 px-8 py-4">
          <ProgressIndicator />
        </div>

        {/* 表单内容 */}
        <div className="p-8">
          <CurrentStepComponent />
        </div>

        {/* 导航按钮 */}
        <div className="bg-gray-50 px-8 py-6 flex justify-between">
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
          <NextBtn onClick={submitForm} msg={isLastStep ? "Finish" : "Next"} />
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
