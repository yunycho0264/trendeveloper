import "../css/App.css";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";
import Background from "./Background";
import Sign from "./Sign";
import styles from "../css/Menu.module.css";

const MyHeader = () => {
  return (
    <header>
      <Menu />
    </header>
  );
};

export default MyHeader;
