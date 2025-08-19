import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage.tsx";
import ResumePage from "./pages/ResumePage.tsx";
import NotFoundPage from "./pages/NotFoundPage.tsx";
import UserProvider from "./context/UserContext.tsx";
import { FormProvider, useFormContext } from "./context/FormContext";
import { setNavigateFunction, clearNavigateFunction } from "./utils/navigation";
import StepForm from "./components/StepForm/StepForm.tsx";
import ToastProvider from "./components/Toast";
// 内部路由组件，用于设置导航函数
const AppRoutes = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // 设置全局导航函数
    setNavigateFunction(navigate);

    // 清理函数
    return () => {
      clearNavigateFunction();
    };
  }, [navigate]);

  return (
    <Routes>
      <Route path="/" element={<IndexPage />} />
      <Route path="/resumeDetail/:id" element={<ResumePage />} />
      <Route
        path="/resumeCreate/"
        element={
          <FormProvider>
            <StepForm />
          </FormProvider>
        }
      />
      {/* 404路由 */}
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
      <ToastProvider />
    </UserProvider>
  );
};

export default App;
