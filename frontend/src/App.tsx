import "./App.css";
import NotiSidebar from "./containers/Sidebar/NotiSidebar";
import {BrowserRouter, Routes, Route} from 'react-router-dom'
import ProjectListTable from "./components/ProjectList";

function App() {
  return (
    <BrowserRouter>
      <NotiSidebar/>
      // TODO: Other components should be placed next to sidebar, not below
      <Routes>
        <Route path="/projects/" element={<ProjectListTable/>}/>
      </Routes>
     </BrowserRouter>
  );
}

export default App;
