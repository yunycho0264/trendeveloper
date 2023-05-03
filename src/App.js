import "./css/App.css";

import React, { useContext } from "react";
import { AuthContext, ContextProvider } from "./context/Auth.context";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHeader from "../src/components/MyHeader";
import MyFooter from "../src/components/MyFooter";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";

import Signup from "./pages/Signup";
import Trend from "./pages/Trend";
import RoadMap from "./pages/RoadMap";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App">
          <MyHeader />
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/roadmap" element={<RoadMap />} />
              <Route path="/trend" element={<Trend />} />
            </Routes>
          </div>
          <MyFooter />
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
