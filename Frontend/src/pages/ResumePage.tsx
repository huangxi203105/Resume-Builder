import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../utils/http";
import { FileText, Clock, CirclePlus } from "lucide-react";
import API_PATH from "../utils/apiPath";
import { UserContext } from "../context/UserContext";
import { LayoutDashboard } from "lucide-react";
import Toast from "../utils/toast";
import StepForm from "../components/StepForm/StepForm";
const ResumePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userContext = useContext(UserContext);

  const logout = () => {
    userContext?.clearUser();
    navigate("/");
  };
  const goToCreateResumePage = () => {
    navigate("/resumeCreate");
  };
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
            <text className="text-2xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">
              My Resume
            </text>
            <text className="font-mono text-gray-500 text-sm ">
              start building your professional resume
            </text>
          </div>
          <div>
            <button className="cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white px-4 py-2 rounded-[10px] hover:scale-105 transition-all duration-300">
              Create Now
            </button>
          </div>
        </div>
      </div>
      {/* 待完善 */}
      {/* <div className="flex items-center justify-center flex-col gap-2">
        <div className="bg-violet-600 opacity-40 p-2 rounded-full w-[40px] h-[40px] flex items-center justify-center">
          <FileText color="white" size={30} />
        </div>
        <div className="text-lg font-bold">No resume Yet</div>
        <div className="text-sm text-gray-500 text-center w-[300px]">
          You have not created any resume yet. Start by clicking the "Create
          Now" button.
        </div>

        <button className="gradient-button flex items-center justify-center gap-2">
          Create your first resume <FileText color="white" size={30} />
        </button>
      </div> */}
      <div className="px-40 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {/* 新增按鈕 */}
        <div className="bg-violet-50 border-dashed border-2 border-violet-200 h-60 flex flex-col justify-center items-center p-4 rounded-lg shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer">
          <div className="rounded-full gradient-button flex items-center justify-center px-2">
            <CirclePlus color="white" size={20} />
          </div>
          <div onClick={goToCreateResumePage} className="font-bold text-lg">
            Create New Resume
          </div>
          <div className="text-sm text-gray-500">
            Start building your cover letter
          </div>
        </div>
        <div className="h-60 flex flex-col gap-2 rounded-lg bg-red-200 hover:text-violet-600 shadow-lg transition-all duration-300 cursor-pointer">
          <div className="bg-red-300 rounded-lg h-35"></div>
          <div className="px-4 flex flex-col">
            <div className="text-sm font-bold">title</div>
            <div className="flex items-center text-xs text-gray-500 gap-2 mt-1">
              <span>
                <Clock color="gray" size={14} />
              </span>
              <span>create at 2023-01-01</span>
              <span>update at 2023-01-01</span>
            </div>
            <div className="mt-3">
              {/* 进度条 */}
              <div className="w-full bg-gray-200 rounded-full h-2.5">
                <div
                  className="bg-violet-600 h-2.5 rounded-full"
                  style={{ width: "50%" }}
                ></div>
              </div>
            </div>
            <div className="flex justify-between items-center mt-2">
              <div className="text-xs text-gray-500">ready to go!</div>
              <div className="text-xs font-bold text-gray-500">
                50% Completed
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default ResumePage;
