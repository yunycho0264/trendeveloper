import "./css/App.css"; // Importing App.css file

import React from "react"; // Importing React library
import {
  AuthContextProvider, // Importing AuthContextProvider component
} from "./context/Auth.context"; // Importing Auth.context file
import { ComContextProvider } from "./context/Com.context"; // Importing ComContextProvider component

import { BrowserRouter, Route, Routes } from "react-router-dom"; // Importing BrowserRouter, Route, and Routes components from react-router-dom library

import Background from "../src/components/Background"; // Importing Background component
import DetailPage from "../src/pages/DetailPage"; // Importing DetailPage component
import DetailTrend from "./pages/DetailTrend"; // Importing DetailTrend component
import MyHeader from "../src/components/MyHeader"; // Importing MyHeader component
import Signin from "./pages/Signin"; // Importing Signin component
import Main from "./pages/Main"; // Importing Main component
import MyPage from "./pages/MyPage"; // Importing MyPage component
import Signup from "./pages/Signup"; // Importing Signup component
import Trend from "./pages/Trend"; // Importing Trend component
import RoadMap from "./pages/RoadMap"; // Importing RoadMap component
import Recruitment from "./pages/RecruitmentPage"; // Importing RecruitmentPage component
import UploadFile from "./components/UploadFile"; // Importing UploadFile component
import Favorite from "./components/Favorite"; // Importing Favorite component

function App() {
  // Defining App function component
  return (
    <BrowserRouter>
      {/* Using BrowserRouter component */}
      <ComContextProvider>
        {/* Using ComContextProvider component */}
        <AuthContextProvider>
          {/* Using AuthContextProvider component */}
          <div className="App">
            {/* App div container */}
            <MyHeader />
            {/* Using MyHeader component */}
            <div className="wrapper">
              {/* Wrapper div container */}
              <Routes>
                {/* Using Routes component */}
                <Route path="/" element={<Main />} />
                {/* Route for Main component */}
                <Route path="/recruitement/list" element={<Recruitment />} />
                {/* Route for Recruitment component */}
                <Route
                  path="/recruitement/detail/:id?"
                  element={<DetailPage />}
                />
                {/* Route for DetailPage component */}
                <Route path="/company/detail/:id?" element={<DetailTrend />} />
                {/* Route for DetailTrend component */}
                <Route path="/signup" element={<Signup />} />
                {/* Route for Signup component */}
                <Route path="/signin" element={<Signin />} />
                {/* Route for Signin component */}
                <Route path="/mypage" element={<MyPage />} />
                {/* Route for MyPage component */}
                <Route path="/roadmap/upload" element={<UploadFile />} />
                {/* Route for UploadFile component */}
                <Route path="/roadmap/favorite" element={<Favorite />} />
                {/* Route for Favorite component */}
                <Route path="/roadmap/stat/:id?" element={<RoadMap />} />
                {/* Route for RoadMap component */}
                <Route path="/trend/stat/:id?" element={<Trend />} />
                {/* Route for Trend component */}
              </Routes>
            </div>
            <Background />
            {/* Using Background component */}
          </div>
        </AuthContextProvider>
      </ComContextProvider>
    </BrowserRouter>
  );
}

export default App; // Exporting App component as default
