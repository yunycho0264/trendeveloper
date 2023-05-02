// import logo from "./logo.svg";
// import { BrowserRouter, Route, Routes } from "react-router-dom";
import styles from "../src/css/App.module.css";
import "./css/index.css";
import Background from "../src/components/Background";
import Menu from "../src/components/Menu";
import DetailPage from "../src/pages/DetailPage";
import Trend from "./pages/Trend";
import MyPage from "./pages/MyPage";

function App() {
  return (
    <div className={styles.App}>
      <Menu />
      <Background />
      <MyPage />
      {/* <Routes>
        <Route path="/background" element={<Background />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/detail-page" element={<DetailPage/>}/>
      </Routes> */}
    </div>
  );
}

export default App;
