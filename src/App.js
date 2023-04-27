// import logo from "./logo.svg";
import { BrowserRouter, Route, Routes } from "react-router-dom";
// import styles from './App.module.css';
import './css/index.css';
import Background from "../src/component/Background";
import Menu from "../src/component/Menu";


function App() {
  return (
    <BrowserRouter>
    <Menu/>
    <Background/>
        <Routes>
        <Route path="/background" element={<Background/>}/>
        <Route path="/menu" element={<Menu/>}/>
        </Routes>
    </BrowserRouter>
  );
}

export default App;
