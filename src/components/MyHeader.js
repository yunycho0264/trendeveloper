import "../css/App.css";
import Navbar from "../components/Navbar";
import Menu from "../components/Menu";

const MyHeader = () => {
  return (
    <header>
      <div className="above-rectangle"></div>
      <Menu />
    </header>
  );
};

export default MyHeader;
