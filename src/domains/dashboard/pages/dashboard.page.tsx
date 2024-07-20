import { useState } from "react";
import Sidebar from "../components/sidebar";
import { MenuIcon } from "lucide-react";
import Playground from "../components/playground";

const Dashboard = () => {
  const [collapseSidebar, setCollapseSidebar] = useState(true);
  function openSidebar() {
    setCollapseSidebar(false);
  }

  function closeSidebar() {
    setCollapseSidebar(true);
  }
  return (
    <div className={`page__container`}>
      <Sidebar closeSidebar={closeSidebar} isCollapsed={collapseSidebar} />

      <div className="note__section">
        <button onClick={openSidebar} className="open__btn">
          <MenuIcon />
        </button>

        <div className="content__section">
          <Playground />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
