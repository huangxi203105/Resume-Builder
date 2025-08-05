import React, { useContext, useRef, useState } from "react";
import AOS from 'aos';
import 'aos/dist/aos.css';
import { landingPageStyles } from "../assets/dummystyle.js";
import { statsMap, cardsMap } from "../model/index.ts";
import Modal from "../components/Modal";
import Card from "../components/Card"
import { UserContext } from "../context/UserContext";
AOS.init({
  offset: 120,       // 触发距离（像素）
  delay: 100,        // 延迟（毫秒）
  duration: 800,     // 动画时长（毫秒）
  easing: 'ease',    // 缓动函数（ease, linear, ease-in-out...）
  once: false,        // 是否只触发一次
  mirror: true,     // 滚动回来时是否反向播放
});
const IndexPage = () => {
  const modalRef: any = useRef(null)
  const [isModalOpen, setIsModalOpen] = useState(false)
  const userContext = useContext(UserContext)
  const showModal = () => {
    setIsModalOpen(true);
  };
  const handleModalClose = () => {
    setIsModalOpen(false);
  }
  const logout = () =>{
    userContext?.clearUser()
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
              ) : (
                <button onClick={showModal} className="cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-2 px-4 rounded-[15px] shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-violet-200">
                  <span className="text-white font-semibold">Get Started</span>
                </button>
            )}
          </div>
        </header>
      </div>
      <div className="px-110 pt-[150px] pb-[150px]">
        <section className="flex justify-between">
          <div className="w-[50%] flex flex-col gap-6">
            <div data-aos="fade-up" data-aos-delay="200" className="text-7xl font-bold text-black">Craft</div>
            <div data-aos="fade-up" data-aos-delay="300" className="text-7xl font-bold bg-gradient-to-r from-violet-600 to-yellow-600 bg-clip-text text-transparent">Professional</div>
            <div data-aos="fade-up" data-aos-delay="400" className="text-7xl font-bold">Resumes</div>
            <div data-aos="fade-up" data-aos-delay="500" className="text-xl font-normal text-[#76787f]">Create job-winning resumes with expertly designed templates. ATS-friendly,recruiter-approved,and tailored to your career goals.</div>
            <div data-aos="fade-up" data-aos-delay="600" className="flex gap-4">
              <button className="w-[200px] cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-2 px-4 rounded-[15px] shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-violet-200">
                <span className="text-white font-semibold">Start Building</span>
              </button>
              <button className="w-[200px] border-solid border-2 border-violet-600 cursor-pointer py-4 px-6 rounded-[15px] shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-violet-200">
                <span className="text-violet-600 font-semibold">View Templates</span>
              </button>
            </div>
            <div className="flex gap-4">
              {
                statsMap.map((stat, index) => (
                  <div data-aos="fade-up" data-aos-delay={`${index * 100 + 200}`} key={index} className="flex flex-col gap-2 text-center">
                    <div className={`text-2xl lg:text-4xl font-black bg-gradient-to-r bg-clip-text text-transparent ${stat.gradient}`}>{stat.value}</div>
                    <div className="text-xs text-slate-500 font-medium">{stat.label}</div>
                  </div>
                ))
              }
            </div>
          </div>
          <div className="w-[50%]" data-aos="fade-up" data-aos-delay="200">
            <div className={landingPageStyles.heroIllustration}>
              <div className={landingPageStyles.heroIllustrationBg}></div>
              <div className={landingPageStyles.heroIllustrationContainer}>
                <svg
                  viewBox="0 0 400 500"
                  className={landingPageStyles.svgContainer}
                  xmlns="http://www.w3.org/2000/svg"
                >
                  {/* Background */}
                  <defs>
                    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#8b5cf6" />
                      <stop offset="100%" stopColor="#d946ef" />
                    </linearGradient>
                    <linearGradient id="cardGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                      <stop offset="0%" stopColor="#ffffff" />
                      <stop offset="100%" stopColor="#f8fafc" />
                    </linearGradient>
                  </defs>

                  {/* SVG elements */}
                  <rect x="50" y="50" width="300" height="400" rx="20" className={landingPageStyles.svgRect} />
                  <circle cx="120" cy="120" r="25" className={landingPageStyles.svgCircle} />
                  <rect x="160" y="105" width="120" height="8" rx="4" className={landingPageStyles.svgRectPrimary} />
                  <rect x="160" y="120" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                  <rect x="70" y="170" width="260" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  <rect x="70" y="185" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  <rect x="70" y="200" width="240" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  <rect x="70" y="230" width="60" height="6" rx="3" className={landingPageStyles.svgRectPrimary} />
                  <rect x="70" y="250" width="40" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                  <rect x="120" y="250" width="50" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                  <rect x="180" y="250" width="45" height="15" rx="7" className={landingPageStyles.svgRectSkill} />
                  <rect x="70" y="290" width="80" height="6" rx="3" className={landingPageStyles.svgRectSecondary} />
                  <rect x="70" y="310" width="180" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  <rect x="70" y="325" width="150" height="4" rx="2" className={landingPageStyles.svgRectLight} />
                  <rect x="70" y="340" width="200" height="4" rx="2" className={landingPageStyles.svgRectLight} />

                  {/* Animated elements */}
                  <circle cx="320" cy="100" r="15" className={landingPageStyles.svgAnimatedCircle}>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; 0,-10; 0,0"
                      dur="3s"
                      repeatCount="indefinite"
                    />
                  </circle>
                  <rect x="30" y="300" width="12" height="12" rx="6" className={landingPageStyles.svgAnimatedRect}>
                    <animateTransform
                      attributeName="transform"
                      type="translate"
                      values="0,0; 5,0; 0,0"
                      dur="2s"
                      repeatCount="indefinite"
                    />
                  </rect>
                  <polygon points="360,200 370,220 350,220" className={landingPageStyles.svgAnimatedPolygon}>
                    <animateTransform
                      attributeName="transform"
                      type="rotate"
                      values="0 360 210; 360 360 210; 0 360 210"
                      dur="4s"
                      repeatCount="indefinite"
                    />
                  </polygon>
                </svg>
              </div>
            </div>
          </div>
        </section>
        <section className="flex gap-4 flex-col mt-[120px]">
          <div className="flex w-full justify-center items-center gap-2">
            <div data-aos="fade-up" data-aos-delay="200" className="text-5xl font-bold">Why Choose</div>
            <div data-aos="fade-up" data-aos-delay="200" className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">ResumeXpert?</div>
          </div>
          <div className="flex w-full justify-center items-center">
            <div data-aos="fade-up" data-aos-delay="300" className="text-normal text-[#878ca4]">Everything you need to create a professional resume that stands out</div>
          </div>
          <div className="flex flex-col w-full justify-between items-center">
            <div data-aos="fade-up" data-aos-delay="400" className="w-full flex justify-between">
              {
                cardsMap.map((card, index) => (
                  <Card
                    key={index}
                    title={card.title}
                    description={card.description}
                    iconColor={card.iconColor}
                    bgColor={card.bgColor}
                  />
                ))
              }
            </div>
            <div className="mt-[150px]">
              <div data-aos="fade-up" data-aos-delay="200" className="flex flex-col gap-4 justify-center bg-[#fefcfe] p-8 rounded-2xl shadow-lg shadow-violet-200">
                <div className="flex w-[700px] justify-center items-center gap-2">
                  <span className="text-5xl font-bold">Ready To Build Your <span className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Standout Resume?</span> </span>
                  {/* <div data-aos="fade-up" data-aos-delay="200" className="text-5xl font-bold">Ready To Build Your </div>
                  <div data-aos="fade-up" data-aos-delay="200" className="text-5xl font-bold bg-gradient-to-r from-violet-600 to-fuchsia-600 bg-clip-text text-transparent">Standout Resume?</div> */}
                </div>
                <div className="flex w-full justify-center items-center">
                  <div data-aos="fade-up" data-aos-delay="300" className="text-normal text-[#878ca4]">join thousands of professionals who landed their dream jobs with our platform</div>
                </div>
                <div data-aos="fade-up" data-aos-delay="400" className="w-full flex justify-center items-center">
                  <button onClick={} className="w-[250px] cursor-pointer bg-gradient-to-r from-violet-600 to-fuchsia-600 text-white py-5 px-4 rounded-[15px] shadow-md overflow-hidden transition-all hover:scale-105 hover:shadow-xl hover:shadow-violet-200 hover:bg-gradient-to-r hover:from-[#d621de] hover:to-[#f7702b]">
                    <span className="text-white font-semibold">Start Building Now!</span>
                  </button>
                </div>
              </div>
            </div>
            <Modal isOpen={isModalOpen} onClose={handleModalClose} ref={modalRef} />
          </div>
        </section>
      </div>
    </div>
  )
};

export default IndexPage;