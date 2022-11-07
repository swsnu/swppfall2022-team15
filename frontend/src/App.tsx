
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./App.css";
import NotiSidebar from "./components/Sidebar/NotiSidebar";
import ProjectListTable from "./containers/ProjectList/ProjectList";
import ProjectDetail from "./components/ProjectDetail/ProjectDetail";


function App() {
  return (
    <BrowserRouter>
      <NotiSidebar/>
      
      <Routes>
        <Route path="/projects/" element={<ProjectListTable/>}/>
        <Route path="/projects/:id" element={<ProjectDetail/>}/>
      </Routes>
     </BrowserRouter>
  );
}

export default App;
