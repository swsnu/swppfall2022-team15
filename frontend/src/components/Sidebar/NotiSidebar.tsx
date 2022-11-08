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
    <div className="background" style={{ display: "flex", height: "100%" }}>
      <Sidebar className="sidebar" data-testid="sidebar" width="200px">
        <Menu>
          <MenuItem routerLink={<Link to="/home" />} className="top">NotiManager</MenuItem>
        </Menu>
        <Menu>
          <MenuItem routerLink={<Link to="/home" />} className="odd" icon={homeIcon} style={{ height: "150px" }}>
            {" "}
            Home{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/projects" />} 
            className="even"
            icon={projectIcon}
            style={{ height: "150px" }}
          >
            {" "}
            Projects{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/targets" />} 
            className="odd"
            icon={targetIcon}
            style={{ height: "150px" }}
          >
            {" "}
            Targets{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/messages" />} 
            className="even"
            icon={messageIcon}
            style={{ height: "150px" }}
          >
            {" "}
            Messages{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/templates" />} 
            className="odd"
            icon={templateIcon}
            style={{ height: "150px" }}
          >
            {" "}
            Templates{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/history" />} 
            className="even"
            icon={historyIcon}
            style={{ height: "150px" }}
          >
            {" "}
            History{" "}
          </MenuItem>
        </Menu>
      </Sidebar>
    </div>
  );
}
