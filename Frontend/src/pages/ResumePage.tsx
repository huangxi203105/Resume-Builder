import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import http from "../utils/http";
import API_PATH from "../utils/apiPath";
import { UserContext } from "../context/UserContext";
import Toast from "../utils/toast";
import StepForm from "../components/StepForm/StepForm";
const ResumePage = () => {
  const navigate = useNavigate();
  const { id } = useParams();
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const userContext = useContext(UserContext)

  const logout = () => {
    userContext?.clearUser()
    navigate('/');
  }
  return (
    <div className="bg-[#f8fbfd] min-h-screen w-[100vw]">
      <div className="z-20 header">
        <header className="w-full fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-violet-100/50 py-4 px-110 flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[12px] shadow-md"></div>
            <div className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">ResumeXpert</div>
          </div>
          <div>
            {userContext?.user ? (
              <div className="flex items-center gap-2 p-3 rounded-[15px] bg-[#f2f2f2]">
                <div className="flex items-center justify-center rounded-[8px] w-[30px] h-[30px] p-2 bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white font-bold">
                  <div>{userContext.user.name.charAt(0)}</div>
                </div>
                <div className="flex flex-col">
                  <div className="text-sm font-bold">{userContext.user.name}</div>
                  <div onClick={logout} className="text-xs font-medium text-violet-600 cursor-pointer">Logout</div>
                </div>
              </div>
            ) : null}
          </div>
        </header>
      </div>
      <div>
        <StepForm />
      </div>
    </div>
  )
}
export default ResumePage;
