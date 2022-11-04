import { Sidebar, Menu, MenuItem, useProSidebar, SidebarProps } from "react-pro-sidebar";
import { FaHome, FaHistory, FaFolderOpen } from "react-icons/fa"
import { FiTarget } from "react-icons/fi"
import { HiTemplate } from "react-icons/hi"
import { MdMessage } from "react-icons/md"
import { AiOutlineMenuUnfold } from "react-icons/ai"

import "./NotiSidebar.css";

export default function NotiSidebar() {
    const { collapseSidebar, collapsed } = useProSidebar();

    const homeIcon = <FaHome size='48'></FaHome>
    const projectIcon = <FaFolderOpen size='48'></FaFolderOpen>
    const targetIcon = <FiTarget size='48'></FiTarget>
    const messageIcon = <MdMessage size='48'></MdMessage>
    const templateIcon = <HiTemplate size='48'></HiTemplate>
    const historyIcon = <FaHistory size='48'></FaHistory>
    const toggleIcon = <AiOutlineMenuUnfold size='36'></AiOutlineMenuUnfold>

    return (
        <div className="background" style={ { display: 'flex', height: '100%' } }>
            <Sidebar className="sidebar">
                <Menu>
                    <MenuItem className="top">NotiManager</MenuItem>
                </Menu>
                <Menu>
                    <MenuItem className="odd" icon={homeIcon} style={ { height: '150px' } }> Home </MenuItem>
                    <MenuItem className="even" icon={projectIcon} style={ { height: '150px' } }> Projects </MenuItem>
                    <MenuItem className="odd" icon={targetIcon} style={ { height: '150px' } }> Targets </MenuItem>
                    <MenuItem className="even" icon={messageIcon} style={ { height: '150px' } }> Messages </MenuItem>
                    <MenuItem className="odd" icon={templateIcon} style={ { height: '150px' } }> Templates </MenuItem>
                    <MenuItem className="even" icon={historyIcon} style={ { height: '150px' } }> History </MenuItem>
                </Menu>
            </Sidebar>
            <main>
                <svg onClick={() => collapseSidebar()}>{toggleIcon}</svg>
            </main>
        </div>

    )
        
}