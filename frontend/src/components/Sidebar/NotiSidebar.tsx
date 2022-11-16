import { Sidebar, Menu, MenuItem } from "react-pro-sidebar";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";

import { FaHome, FaHistory, FaFolderOpen } from "react-icons/fa";
import { FiTarget } from "react-icons/fi";
import { HiTemplate } from "react-icons/hi";
import { MdMessage } from "react-icons/md";
//import { AiOutlineMenuUnfold } from "react-icons/ai";

import "./NotiSidebar.css";

export default function NotiSidebar() {
  //const { collapseSidebar } = useProSidebar();
  const [ page, setPage ] = useState("home");

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
            // className={page === "home" ? "item active" : "item"}
            onClick={() => setPage("home")}
            data-testid="homeButton"
            icon={homeIcon}
          >
            {" "}
            Home{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/projects" />}
            // className={page === "projects" ? "item active" : "item"}
            onClick={() => setPage("projects")}
            data-testid="projectsButton"
            icon={projectIcon}
          >
            {" "}
            Projects{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/targets" />}
            // className={page === "targets" ? "item active" : "item"}
            onClick={() => setPage("targets")}
            data-testid="targetsButton"
            icon={targetIcon}
          >
            {" "}
            Targets{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/messages" />}
            // className={page === "messages" ? "item active" : "item"}
            onClick={() => {console.log(page); setPage("messages")}}
            data-testid="messagesButton"
            icon={messageIcon}
          >
            {" "}
            Messages{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/templates" />}
            // className={page === "templates" ? "item active" : "item"}
            onClick={() => setPage("templates")}
            data-testid="templatesButton"
            icon={templateIcon}
          >
            {" "}
            Templates{" "}
          </MenuItem>
          <MenuItem
            routerLink={<Link to="/history" />}
            // className={page === "history" ? "item active" : "item"}
            onClick={() => setPage("history")}
            data-testid="historyButton"
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

