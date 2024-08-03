import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import SidebarQuestionRow from "./sidebar-question-row";
import { useAuth } from "domains/auth/hooks/useAuth";
import useQuestionQueries from "domains/question/queries/question.query";

type SidebarProps = {
  isOpen: boolean;
  toggleDrawer: () => void;
};

const Sidebar = ({ isOpen, toggleDrawer }: SidebarProps) => {
  const { auth } = useAuth();
  const { useGetAllQuestions } = useQuestionQueries();
  const { data: questionsList } = useGetAllQuestions(!!auth?.accessToken);

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
            <SidebarQuestionRow question={question} key={question.id} />
          ))}
        </ul>
      )}
    </Drawer>
  );
};

export default Sidebar;
