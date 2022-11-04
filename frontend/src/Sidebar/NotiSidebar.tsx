import { Sidebar, Menu, MenuItem, useProSidebar } from "react-pro-sidebar";
import { FaHome, FaHistory, FaFolderOpen } from "react-icons/fa"
import { FiTarget } from "react-icons/fi"
import { HiTemplate } from "react-icons/hi"
import { MdMessage } from "react-icons/md"

export default function NotiSidebar() {
    //const { collapse } = useProSidebar();

    return (
        <Sidebar>
            <Menu>
               <MenuItem icon={<FaHome />}> Home </MenuItem>
               <MenuItem icon={<FaFolderOpen />}> Projects </MenuItem>
               <MenuItem icon={<FiTarget />}> Targets </MenuItem>
               <MenuItem icon={<MdMessage />}> Messages </MenuItem>
               <MenuItem icon={<HiTemplate />}> Templates </MenuItem>
               <MenuItem icon={<FaHistory />}> History </MenuItem>
            </Menu>
        </Sidebar>
        
    )
}