// import logo from "./logo.svg";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "../src/css/App.module.css";
import "./css/index.css";
import Background from "../src/components/Background";
import Menu from "../src/components/Menu";
import DetailPage from "../src/pages/DetailPage";
import DetailTrend from "./pages/DetailTrend";
// import Signin from "./pages/Signin";
// import Signup from "./pages/Signup";

function App() {
  return (
    <div className={styles.App}>
      <Menu />
      <Background />
      <DetailPage />
      {/* <DetailTrend /> */}
      {/* <Routes> */}
        {/* <Route path="/" element={<Main />} /> */}
        {/* <Route path="/signup" element={<Signup />} />
        <Route path="/signin" element={<Signin />}/> */}
        {/* <Route path="/mypage" element={<MyPage />} /> */}
        {/* <Route path="/roadmap" element={<RoadMap />} /> */}
        {/* <Route path="/trend" element={<Trend />} /> */}
      {/* </Routes> */}
    </div>
  );
}

export default App;
