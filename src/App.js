import "./css/App.css";

import { BrowserRouter, Route, Routes } from "react-router-dom";
import MyHeader from "../src/components/MyHeader";
import MyFooter from "../src/components/MyFooter";
import Signin from "./pages/Signin";
import Main from "./pages/Main";
import MyPage from "./pages/MyPage";

import Signup from "./pages/Signup";
import Navbar from "./components/Navbar";

function App() {
  return (
    <BrowserRouter>
      <div className="App">
        <MyHeader />
        <Navbar />
        <div className="wrapper">
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/mypage" element={<MyPage />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Routes>
        </div>
        <MyFooter />
      </div>
    </BrowserRouter>
  );
}

export default App;
