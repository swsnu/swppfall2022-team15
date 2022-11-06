import { BrowserRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import Project from "./components/Project/project";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/projects/:id" element={<Project/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
