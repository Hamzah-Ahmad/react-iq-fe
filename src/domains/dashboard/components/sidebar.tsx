import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import useQuestionQueries from "../queries/question.query";
import QuestionRow from "./question-row";
import { useAuth } from "domains/auth/hooks/useAuth";

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
            <QuestionRow question={question} />
          ))}
        </ul>
      )}
    </Drawer>
  );
};

export default Sidebar;
