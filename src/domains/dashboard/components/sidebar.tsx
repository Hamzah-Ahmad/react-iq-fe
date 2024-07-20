import useQuestionsQuery from "../queries/question.queries";

type SidebarProps = {
  isCollapsed?: boolean;
  closeSidebar?: () => void;
};

const Sidebar = ({ closeSidebar, isCollapsed }: SidebarProps) => {
  const { useGetQuestions } = useQuestionsQuery();
  const { data } = useGetQuestions();

  console.log("Question Data: ", data);
  return (
    <div className={`sidebar ${isCollapsed && "collapsed"}`}>
      <button className="close__btn" onClick={closeSidebar}>
        x
      </button>

      <div className="sidebar__item__title">Test</div>
    </div>
  );
};

export default Sidebar;
