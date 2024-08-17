import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import SidebarQuestionRow from "./sidebar-question-row";
import { QuestionWithUserSubmission } from "domains/question/components";
import { useSearchParams } from "react-router-dom";

type SidebarProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
  questionsList: QuestionWithUserSubmission[];
};

const Sidebar = ({ isOpen, toggleDrawer, questionsList }: SidebarProps) => {
  const [searchParams] = useSearchParams();
  const questionId = searchParams.get("questionId") || "";

  return (
    <Drawer
      open={isOpen}
      onClose={toggleDrawer}
      direction="left"
      className="!bg-card !w-96 py-8"
    >
      <h4 className="text-xl pl-8 mb-8">Questions</h4>
      {questionsList && (
        <ul>
          {questionsList.map((question) => (
            <SidebarQuestionRow question={question} key={question.id} selected={question.id === questionId} />
          ))}
        </ul>
      )}
    </Drawer>
  );
};

export default Sidebar;
