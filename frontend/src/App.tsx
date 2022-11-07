import "./App.css";
import NotiSidebar from "./components/Sidebar/NotiSidebar";

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
