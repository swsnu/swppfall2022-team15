
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./App.css";
import NotiSidebar from "./components/Sidebar/NotiSidebar";
import ProjectListTable from "./containers/ProjectList/ProjectList";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail";
import Home from './containers/Home/Home';


function App() {
  return (
    <BrowserRouter>
      <div className="sidebar">
        <NotiSidebar />
      </div>
      <div className="contents">
        <Routes>
          <Route path="/home" element={<Home />} />
          <Route path="/projects" element={<ProjectListTable />} />
          <Route path="/projects/:id" element={<ProjectDetail />} />
        </Routes>

      </div>
        
     </BrowserRouter>
  );
}

export default App;
