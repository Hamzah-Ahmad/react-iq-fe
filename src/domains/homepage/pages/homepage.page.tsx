import { useState } from "react";
import Sidebar from "../components/sidebar";
import Workspace from "../components/workspace";
import { Button } from "shared/components/ui/button";

const Homepage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Button variant="outline" onClick={toggleDrawer} className="m-4 border-primary">Problem List</Button>
      <Sidebar isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <Workspace />
    </>
  );
};

export default Homepage;
