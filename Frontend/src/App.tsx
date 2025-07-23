import React from "react";
import { Routes, Route } from "react-router-dom";
import IndexPage from "./pages/IndexPage.tsx";
import UserProvider from "./context/UserContext.tsx";
const App = () => {
  return (
    <UserProvider>
      <Routes>
        <Route path="/" element={<IndexPage />} />
      </Routes>
    </UserProvider>
  )
}

export default App;
