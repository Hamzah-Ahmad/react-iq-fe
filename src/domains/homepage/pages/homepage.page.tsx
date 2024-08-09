import { useState } from "react";
import Sidebar from "../components/sidebar";
import Workspace from "../components/workspace";
import { Button } from "shared/components/ui/button";
import SubmissionViewer from "domains/submissions/components/submission-viewer";
import { List } from "lucide-react";

const Homepage = () => {
  const [isOpen, setIsOpen] = useState(false);
  const toggleDrawer = () => {
    setIsOpen((prevState) => !prevState);
  };

  return (
    <>
      <Button
        variant="ghost"
        onClick={toggleDrawer}
        className="m-4 border-primary flex gap-x-2 items-center"
      >
        <List /> Problem List
      </Button>
      <Sidebar isOpen={isOpen} toggleDrawer={toggleDrawer} />
      <Workspace />
      <SubmissionViewer />
    </>
  );
};

export default Homepage;
