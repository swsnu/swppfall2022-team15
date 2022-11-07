
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import "./App.css";
import NotiSidebar from "./components/Sidebar/NotiSidebar";
import ProjectListTable from "./containers/ProjectList";


function App() {
  return (
    <BrowserRouter>
      <NotiSidebar/>
      
      <Routes>
        <Route path="/projects/" element={<ProjectListTable/>}/>
      </Routes>
     </BrowserRouter>
  );
}

export default App;
