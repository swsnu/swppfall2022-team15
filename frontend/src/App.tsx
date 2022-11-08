import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  Outlet,
} from "react-router-dom";

import "./App.css";
import NotiSidebar from "./components/Sidebar/NotiSidebar";
import ProjectListTable from "./containers/ProjectList/ProjectList";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail";
import Home from "./containers/Home/Home";
import SignIn from "./containers/SignIn/SignIn";
import SignUp from "./containers/SignUp/SignUp";
import TargetListTable from "./containers/TargetList/TargetList";
import MessageListTable from "./containers/MessageList/MessageList";

const SidebarLayout = () => (
  <>
    <div className="sidebar" style={{ height: "100vh" }}>
      <NotiSidebar />
    </div>
    <div className="contents">
      <Outlet />
    </div>
  </>
);

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate replace to={"/login"} />} />
        <Route path="/login" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route element={<SidebarLayout />}>
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<ProjectListTable />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
          <Route path="/targets" element={<TargetListTable />} />
          <Route path="/messages" element={<MessageListTable />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
