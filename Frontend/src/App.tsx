import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage.tsx";
import ResumePage from "./pages/ResumePage.tsx";
import UserProvider from "./context/UserContext.tsx";
const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
      <Routes>
        <Route path="/resume/:id" element={<ResumePage />} />
      </Routes>
    </UserProvider>
  )
}

export default App;
