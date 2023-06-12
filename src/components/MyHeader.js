// Importing the App.css file to apply styles to the component
import "../css/App.css";
// Importing the Menu component to be used in the header
import Menu from "../components/Menu";

// Defining a functional component called MyHeader
const MyHeader = () => {
  return (
    // Creating a header element
    <header>
      {/* Rendering the Menu component inside the header */}
      <Menu />
    </header>
  );
};

// Exporting the MyHeader component as the default export of this module
export default MyHeader;
