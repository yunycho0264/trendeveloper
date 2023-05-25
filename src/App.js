import "./css/App.css";
import { Link } from "react-router-dom";
import styles from "../src/css/App.module.css";
import "./css/index.css";
import Background from "../src/components/Background";
import Menu from "../src/components/Menu";
import DetailPage from "../src/pages/DetailPage";
import DetailTrend from "./pages/DetailTrend";
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
import Recruitment from "./pages/RecruitmentPage";
import Navbar from "./components/Navbar";
import Sign from "./components/Sign";
import UploadFile from "./components/UploadFile";
import SelectionBoxList from "./components/SelectionBoxList";

function App() {
  return (
    <BrowserRouter>
      <ContextProvider>
        <div className="App">
          <MyHeader />

          <Sign />
          <div className="wrapper">
            <Routes>
              <Route path="/" element={<Main />} />
              <Route path="/recruitement/list" element={<Recruitment />} />
              <Route
                path="/recruitement/detail/:id?"
                element={<DetailPage />}
              />

              <Route path="/company/detail/:id?" element={<DetailTrend />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/mypage" element={<MyPage />} />
              <Route path="/roadmap/upload" element={<UploadFile />} />
              <Route path="/roadmap/select" element={<SelectionBoxList />} />
              <Route path="/roadmap/stat/:id?" element={<RoadMap />} />
              <Route path="/trend/stat/:id?" element={<Trend />} />
            </Routes>
          </div>
          <Background />
        </div>
      </ContextProvider>
    </BrowserRouter>
  );
}

export default App;
