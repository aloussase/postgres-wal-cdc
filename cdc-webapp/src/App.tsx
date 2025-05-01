import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { Navbar } from "./Navbar.tsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<Navbar />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
