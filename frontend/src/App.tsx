import Button from "@mui/material/Button";
import "./App.css";
import NotiSidebar from "./containers/Sidebar/NotiSidebar";

function App() {
  return (
    <div className="App" style={ { height: '100vh' } }>
      <NotiSidebar/>
    </div>
  );
}

export default App;
