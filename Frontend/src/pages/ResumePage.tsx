import React, { useEffect, useState } from "react";
import http from "../utils/http";
import API_PATH from "../utils/apiPath";


const ResumePage = () =>{
  const [resume, setResume] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  return (
    <div className="bg-[#f8fbfd] min-h-screen w-[100vw]">
      <div className="z-20 header">
        <header className="w-full fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl border-b border-violet-100/50 py-4 px-110 flex justify-between">
          <div className="flex items-center gap-2">
            <div className="w-[30px] h-[30px] bg-gradient-to-r from-violet-600 to-fuchsia-600 rounded-[12px] shadow-md"></div>
            <div className="text-xl font-semibold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">ResumeXpert</div>
          </div>
        </header>
      </div>
    </div>
  )
}
export default ResumePage;