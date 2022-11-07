import "./App.css";
import NotiSidebar from "./containers/Sidebar/NotiSidebar";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProjectListTable from "./containers/ProjectList";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail";

function App() {
  return (
    <BrowserRouter>
      <NotiSidebar/>
      // TODO: Other components should be placed next to sidebar, not below
      <Routes>
        <Route path="/projects/" element={<ProjectListTable/>}/>
        <Route path="/projects/:id" element={<ProjectDetail/>}/>
      </Routes>
     </BrowserRouter>
  );
}

export default App;
