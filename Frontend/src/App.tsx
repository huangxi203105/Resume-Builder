import { useEffect } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import IndexPage from "./pages/IndexPage.tsx";
import ResumePage from "./pages/ResumePage.tsx";
import UserProvider from "./context/UserContext.tsx";
import { setNavigateFunction, clearNavigateFunction } from "./utils/navigation";
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
      <Route path="/resume/:id" element={<ResumePage />} />
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppRoutes />
    </UserProvider>
  )
}

export default App;
