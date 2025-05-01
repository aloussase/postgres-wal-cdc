import { HashRouter, Route, Routes } from "react-router-dom";
import "./App.css";
import { TodoApp } from "./todo/app.tsx";

function App() {
  return (
    <HashRouter>
      <Routes>
        <Route path="*" element={<TodoApp />} />
      </Routes>
    </HashRouter>
  );
}

export default App;
