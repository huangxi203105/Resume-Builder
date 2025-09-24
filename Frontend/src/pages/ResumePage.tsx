import React, { useContext, useEffect, useState } from "react";
import request from "../utils/request";
import { Clock, CirclePlus } from "lucide-react";
import API_PATH from "../utils/apiPath";
import { UserContext } from "../context/UserContext";
import { LayoutDashboard } from "lucide-react";
import Toast from "../utils/toast";
import type { ResumeFormData } from "../types/resume";
import { navigateTo } from "../utils/navigation";

const ResumePage = () => {
  const userContext = useContext(UserContext);
  const [resumes, setResumes] = useState<ResumeFormData[]>([]);
  const list = ["contactInfo", "workExperience", "education", "skills", "projects", "achievements", "certifications", "languages", "interests"];
  const logout = () => {
    userContext?.clearUser();
    navigateTo("/");
  };
  const goToCreateResumePage = (id?: number) => {
    if (id) {
      navigateTo(`/resumeDetail/${id}`);
    }
    else {
      navigateTo(`/resumeDetail`);
    }
  };
  const getResumes = async () => {
    const res = await request.get(API_PATH.GET_ALL);
    res.data.map((resume: any) => {
      let progress = 0;
      list.forEach((item) => {
        let isCompleted = false;
        
        if (Array.isArray(resume[item])) {
          isCompleted = resume[item].length > 0;
        } else {
          isCompleted = Object.values(resume[item]).some(value =>
            value !== null && value !== undefined && value !== ""
          );
        }
        
        if (isCompleted) {
          progress++;
        }
      });

      // 计算百分比：完成项数 / 总项数 * 100
      progress = Math.round((progress / list.length) * 100);
      resume.progress = progress;
      return resume;
    });
    setResumes(res.data);
  };

  useEffect(() => {
    getResumes();
  }, []);
  return (
    <div className="bg-[#f8fbfd] min-h-screen w-[100vw]">
      <div className="z-20 header">
        <header className="w-full fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-violet-100/50 py-2 px-80 flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[12px] shadow-md flex items-center justify-center">
              <LayoutDashboard color="white" size={20} />
            </div>
            <div className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              ResumeXpert
            </div>
          </div>
          <div>
            {userContext?.user ? (
              <div className="flex items-center gap-2 p-3 rounded-[15px] bg-[#f2f2f2]">
                <div className="flex items-center justify-center rounded-[8px] w-[30px] h-[30px] p-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold">
                  <div>{userContext.user.name.charAt(0)}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold">
                    {userContext.user.name}
                  </div>
                  <div
                    onClick={logout}
                    className="text-xs font-medium text-violet-600 cursor-pointer"
                  >
                    Logout
                  </div>
                </div>
              </div>
            ) : null}
          </div>
        </header>
      </div>
      <div className="w-full px-80 pt-[100px] pb-10">
        <div className="flex justify-between items-center">
          <div className="font-sans flex flex-col gap-1">
            <div className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              My Resume
            </div>
            <div className="font-mono text-gray-500 text-sm ">
              start building your professional resume
            </div>
          </div>
          <div>
            <button className="cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-[10px] hover:scale-105 transition-all duration-300">
              Create Now
            </button>
          </div>
        </div>
      </div>
      <div className="px-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* 新增按鈕 */}
        <div onClick={() => goToCreateResumePage()} className="bg-violet-50 border-dashed border-2 border-violet-200 h-60 flex flex-col justify-center items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="rounded-full gradient-button flex items-center justify-center px-2">
            <CirclePlus color="white" size={20} />
          </div>
          <div className="font-bold text-lg">
            Create New Resume
          </div>
          <div className="text-sm text-gray-500">
            Start building your cover letter
          </div>
        </div>
        {resumes.map((resume) => (
          <div onClick={() => goToCreateResumePage(resume._id!)} className="h-60 flex flex-col gap-2 rounded-lg bg-red-200 hover:text-violet-600 shadow-lg transition-all duration-300 cursor-pointer">
            <div className="bg-red-300 rounded-lg h-35"></div>
            <div className="px-4 flex flex-col">
              <div className="text-sm font-bold">{resume.title}</div>
              <div className="flex items-center text-xs text-gray-500 gap-2 mt-1">
                <span>
                  <Clock color="gray" size={14} />
                </span>
                <span>{resume.createdAt ? resume.createdAt.split('T')[0] : 'N/A'}</span>
                <span>update at {resume.updatedAt ? resume.updatedAt.split('T')[0] : 'N/A'}</span>
              </div>
              <div className="mt-3">
                {/* 进度条 */}
                <div className="w-full bg-gray-200 rounded-full h-2.5">
                  <div
                    className="bg-violet-600 h-2.5 rounded-full"
                    style={{ width: `${resume.progress}%` }}
                  ></div>
                </div>
              </div>
              <div className="flex justify-between items-center mt-2">
                <div className="text-xs font-bold text-gray-500">
                  {resume.progress}% Completed
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
export default ResumePage;
