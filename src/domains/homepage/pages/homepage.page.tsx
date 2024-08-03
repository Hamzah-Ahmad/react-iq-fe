import { useState } from "react";
import Sidebar from "../components/sidebar";
import Workspace from "../components/workspace";

const Homepage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <button onClick={toggleDrawer}>Open</button>
      <Sidebar isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <Workspace />
    </>
  );
};

export default Homepage;
