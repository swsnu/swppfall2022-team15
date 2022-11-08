import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";

import { FaHome, FaHistory, FaFolderOpen } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { HiTemplate } from "react-icons/hi";
import { MdMessage } from "react-icons/md";
//import { AiOutlineMenuUnfold } from "react-icons/ai";

import "./NotiSidebar.css";

export default function NotiSidebar() {
  //const { collapseSidebar } = useProSidebar();

  const homeIcon = <FaHome size="48"></FaHome>;
  const projectIcon = <FaFolderOpen size="48"></FaFolderOpen>;
  const targetIcon = <FiTarget size="48"></FiTarget>;
  const messageIcon = <MdMessage size="48"></MdMessage>;
  const templateIcon = <HiTemplate size="48"></HiTemplate>;
  const historyIcon = <FaHistory size="48"></FaHistory>;
  /*
  const toggleIcon = (
    <AiOutlineMenuUnfold
      size="24"
      data-testid={"collapseIcon"}
    ></AiOutlineMenuUnfold>
  );
  */

  return (
    <div className="background" style={{ height: "100%" }}>
      <Sidebar className="sidebar" data-testid="sidebar" width="280px">
        <Menu className="noti">
          <MenuItem routerLink={<Link to="/home" />} className="top">
            NotiManager
          </MenuItem>
        </Menu>
        <Menu className="menu">
          <MenuItem
            routerLink={<Link to="/home" />}
            className="item"
            icon={homeIcon}
          >
            {" "}
            Home{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/projects" />}
            className="item"
            icon={projectIcon}
          >
            {" "}
            Projects{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/targets" />}
            className="item"
            icon={targetIcon}
          >
            {" "}
            Targets{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/messages" />}
            className="item"
            icon={messageIcon}
          >
            {" "}
            Messages{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/templates" />}
            className="item"
            icon={templateIcon}
          >
            {" "}
            Templates{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/history" />}
            className="item"
            icon={historyIcon}
          >
            {" "}
            History{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
