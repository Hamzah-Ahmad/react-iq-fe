import React, { useState } from "react";
import Sidebar from "../components/sidebar";
import { MenuIcon } from "lucide-react";

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

        <div className="intro__section">
          {/* <div className="title">Welcome to LocalNotes!</div>
          <div className="subtitle">
            Click the <strong>Create</strong> button on the sidebar to create
            your first note
          </div>
          <div className="subtitle">
            All notes are saved automatically to your browser's storage
          </div> */}
          Test
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
