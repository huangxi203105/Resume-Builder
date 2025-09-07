import { useEffect, Suspense, lazy } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import UserProvider from "./context/UserContext.tsx";
import { FormProvider, useFormContext } from "./context/FormContext";
import { setNavigateFunction, clearNavigateFunction } from "./utils/navigation";
import ToastProvider from "./components/Toast";
import {LoadingSpinner} from "./components/Loading.tsx"
// 路由懒加载
const IndexPage = lazy(() => import("./pages/IndexPage.tsx"));
const ResumePage = lazy(() => import("./pages/ResumePage.tsx"));
const NotFoundPage = lazy(() => import("./pages/NotFoundPage.tsx"));
const StepForm = lazy(() => import("./components/StepForm/StepForm.tsx"));



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
    <Suspense fallback={<LoadingSpinner />}>
      <Routes>
        <Route path="/" element={<IndexPage />} />
        <Route path="/resumeList/" element={<ResumePage />} />
        <Route
          path="/resumeDetail/:id"
          element={
            <FormProvider>
              <StepForm />
            </FormProvider>
          }
        />
        {/* 404路由 */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </Suspense>
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
