type SidebarProps = {
  isCollapsed?: boolean;
  closeSidebar?: () => void;
};

const Sidebar = ({ closeSidebar, isCollapsed }: SidebarProps) => {
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
